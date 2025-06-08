import {
    StyleSheet, View, Text, Image,
    Dimensions,
    TextInput, TouchableOpacity, Button, Platform,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';



const LoginPage = () => {
    const { name, params } = useRoute(); //dùng useRoute để lấy tham số từ route
    const PHONE_HEIGHT = Dimensions.get("screen").height;
    const PHONE_WIDTH = Dimensions.get("screen").width;

    const [mssv, getMssv] = useState("");
    const [password, getPassword] = useState("");
    

  
            const navigation = useNavigation();
            return (
                <View style={styles.container}>
                    <Text style={styles.introbig}>
                        LoginPage for our beloved {params?.name}!
                    </Text>
                    

                    <TextInput
                        placeholder="Enter your ID"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        style={styles.inputStyle}
                    />

                    <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor="gray"
                        style={styles.inputStyle}
                    />

                    <Button
                        title="Login"
                        color="yellow"
                        onPress={() => {
                            if (mssv === "1" || password === "1") {
                                       
                                Alert.alert("Login failed", "Please check your ID and password again");
                            } navigation.navigate("HomePagestd");


                        }}
                    />

                   

                </View>
            );
        }



export default LoginPage;

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'darkred',
                
                alignContent: 'center',
                justifyContent: 'center',
            }

            , introbig: {
                color: 'yellow',
                fontSize: 30,
                marginBottom: 20,
                fontWeight: 'bold',
                marginLeft: 30,
                marginRight: 30,
                textAlign: 'center'
            },
            inputStyle: {
                backgroundColor: 'white',
                width: '80% PHONE_WIDTH',
                height: 50,
                borderRadius: 10,
                paddingHorizontal: 20,
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 20,
            }
        })