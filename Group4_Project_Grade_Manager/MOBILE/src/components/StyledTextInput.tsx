import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const StyledTextInput = (props: TextInputProps) => {
    return (
        <TextInput
            style={styles.input}
            placeholderTextColor="#a9a9a9"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd'
    },
});

export default StyledTextInput;