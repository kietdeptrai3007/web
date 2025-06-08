import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import StyledButton from '../components/StyledButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileScreen = () => {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name="person-circle" size={100} color="#A90000" />
                <Text style={styles.username}>{user?.username}</Text>
                <Text style={styles.role}>
                    Vai trò: {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </Text>
                <StyledButton
                    title="Đăng xuất"
                    onPress={logout}
                    style={{ backgroundColor: '#555', marginTop: 30 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 30,
        width: '90%',
        alignItems: 'center',
        elevation: 5,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    role: {
        fontSize: 16,
        color: 'gray',
        fontStyle: 'italic',
    }
});

export default ProfileScreen;