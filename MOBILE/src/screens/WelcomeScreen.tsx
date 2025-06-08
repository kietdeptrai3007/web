import { StyleSheet, View, Text, Button, SafeAreaView, Platform, Image } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PurScr from './HomePagestd';

const WelcomeScreen = () => {

  const navigation = useNavigation()
  const { name, params } = useRoute(); //dùng useRoute để lấy tham số từ route

  return (

    <SafeAreaView style={styles.container}>

      <View>
        <Image
          source={require('../assets/bk.png')}
          style={{ width: 100, height: 100, marginBottom: 20, alignSelf: 'center' }}
        />

        <Text
          style={styles.introbig}
        >Welcome to maMa!
        </Text>
      </View>


      <Text
        style={styles.introsmall}>
        HUST simple grade-viewing and managing app for your {Platform.OS === "android" ? "Android" : "IOS"}.
      </Text>

      <Text style={styles.choseRole}>
        Choose your role to get started:
      </Text>

      <Text style={styles.textP} onPress={() => navigation.navigate("LoginPage", { name: "Student" })}> Student </Text>
      <Text style={styles.textP} onPress={() => navigation.navigate("LoginPage", { name: "Lecturer" })}> Lecturer </Text>

    </SafeAreaView>
  );
}
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "android" ? 'darkred' : 'darkred',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introbig: {
    color: 'yellow', fontSize: 30, fontWeight: 'bold', textAlign: 'center'
  },
  introsmall: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Arial', 
  },
  choseRole: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  textP: {
    borderBlockColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    backgroundColor: 'lightgray',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginTop: 10,
  }

})