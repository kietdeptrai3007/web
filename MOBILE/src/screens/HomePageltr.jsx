import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import {
    useNavigation,
    useRoute
} from '@react-navigation/native';


const HomePageltr = () => {
   
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
                "gold"
            </Text>

        </View>
    );
}
export default HomePageltr;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        alignContent: 'center',
        justifyContent: 'center',

    }
})