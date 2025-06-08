import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { registerUser } from '../api';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';

const RegisterScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        setIsLoading(true);
        try {
            // Vai trò mặc định là 'user' khi đăng ký qua app
            await registerUser({ username, password, role: 'user' });
            Alert.alert("Thành công", "Tài khoản đã được tạo. Vui lòng đăng nhập.");
            navigation.goBack();
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Đã có lỗi xảy ra.";
            Alert.alert("Đăng ký thất bại", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/hust-logo.png')} style={styles.logo} />
            <Text style={styles.title}>Đăng Ký Tài Khoản</Text>

            <StyledTextInput
                placeholder="Tên đăng nhập mới"
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
                : <StyledButton title="Đăng ký" onPress={handleRegister} />
            }

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

// Sử dụng lại styles tương tự LoginScreen
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
        marginBottom: 30,
    },
    linkText: {
        color: '#FFFFFF',
        marginTop: 20,
        textDecorationLine: 'underline',
    }
});

export default RegisterScreen;