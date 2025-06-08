import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('admin'); // Mặc định để test
    const [password, setPassword] = useState('123456'); // Mặc định để test
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        setIsLoading(true);
        try {
            await login(username, password);
        } catch (error: any) {
            Alert.alert("Đăng nhập thất bại", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/hust-logo.png')} style={styles.logo} />
            <Text style={styles.title}>HUST Grade Management</Text>
            <Text style={styles.subtitle}>Đăng nhập vào hệ thống</Text>

            <StyledTextInput
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <StyledTextInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {isLoading 
                ? <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }}/>
                : <StyledButton title="Đăng nhập" onPress={handleLogin} />
            }

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A90000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFD700',
        marginBottom: 30,
    },
    linkText: {
        color: '#FFFFFF',
        marginTop: 20,
        textDecorationLine: 'underline',
    }
});

export default LoginScreen;