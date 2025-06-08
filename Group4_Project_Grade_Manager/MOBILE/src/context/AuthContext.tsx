import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api';

interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'user';
  // Thêm token nếu API của bạn trả về token
  // token: string;
}

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  login: (username: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const userString = await AsyncStorage.getItem('user');
            if (userString) {
                setUser(JSON.parse(userString));
            }
            setIsLoading(false);
        };
        loadUserFromStorage();
    }, []);

    const login = async (username: string, pass: string) => {
        const response = await loginUser({ username, password: pass });
        if (response.data && response.data.success) {
            const userData: User = response.data.user;
            setUser(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
        } else {
            throw new Error(response.data.error || 'Đăng nhập thất bại');
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};