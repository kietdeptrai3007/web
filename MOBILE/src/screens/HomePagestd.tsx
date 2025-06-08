import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import {
    useNavigation,
    useRoute
} from '@react-navigation/native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import MyTabs from '../../navigation/BottomTabs';


const HomePagestd = () => {
   
    const navigation = useNavigation();
    return (
        <MyTabs />
    );
}
export default HomePagestd;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkred',
        alignContent: 'center',
        justifyContent: 'center',

    }
})