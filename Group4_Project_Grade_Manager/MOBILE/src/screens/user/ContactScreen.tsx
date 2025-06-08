import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';
import { submitFeedback } from '../../api';

const ContactScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendFeedback = async () => {
        if (!name || !email || !message) {
            Alert.alert("Thông tin trống", "Vui lòng điền đầy đủ các trường.");
            return;
        }
        setLoading(true);
        try {
            await submitFeedback({ name, email, message });
            Alert.alert("Thành công", "Cảm ơn bạn đã gửi phản hồi!");
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            Alert.alert("Lỗi", "Không thể gửi phản hồi lúc này.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Gửi Phản Hồi</Text>
                <StyledTextInput placeholder="Tên của bạn" value={name} onChangeText={setName} />
                <StyledTextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <StyledTextInput
                    placeholder="Nội dung phản hồi..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                    style={{ height: 120, textAlignVertical: 'top' }}
                />
                {loading 
                    ? <ActivityIndicator size="large" color="#A90000" />
                    : <StyledButton title="Gửi" onPress={handleSendFeedback} />
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        justifyContent: 'center',
    },
    form: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
});

export default ContactScreen;