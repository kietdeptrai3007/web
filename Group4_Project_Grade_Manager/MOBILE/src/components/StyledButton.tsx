import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
}

const StyledButton = ({ title, onPress, style }: ButtonProps) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFD700', // HUST Yellow
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        elevation: 3,
    },
    buttonText: {
        color: '#A90000', // HUST Red
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StyledButton;