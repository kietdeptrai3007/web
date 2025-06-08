import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';

const student = {
    name: "Vũ Thành Hưng",
    studentId: "20205678",
    school: "Hanoi University of Science and Technology (HUST)",
    email: "vthang@student.hust.edu.vn",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg", // link avatar mẫu, thay bằng ảnh thật nếu có
};

const AboutMe = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: student.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.school}>{student.school}</Text>
                <Text style={styles.id}>Mã SV: {student.studentId}</Text>
                <Text style={styles.email}>{student.email}</Text>
            </View>
        </View>
    );
};

export default AboutMe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkred',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        fontFamily: 'Arial',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
    },})