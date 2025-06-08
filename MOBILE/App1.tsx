import { Dimensions, StyleSheet, Text, SafeAreaView, Button, Alert,View, TouchableOpacity, Pressable, Image, ScrollView, Platform, ActivityIndicator } from 'react-native';
//các import cần thiết từ react-native và expo component
//pressable là một component có thể được nhấn, nó sẽ thay thế cho TouchableOpacity
// platform là một module cho phép bạn kiểm tra nền tảng hiện tại của ứng dụng (iOS, Android, v.v.)

//textinput là một component cho phép người dùng nhập văn bản

import { TextInput } from 'react-native';

export default function App() { // hàm chính của ứng dụng
  // hàm này sẽ được gọi khi ứng dụng được khởi chạy
  // nó sẽ trả về một component React Native
  // trong trường hợp này là một View với một Text và StatusBar

  //percentage, dimension, lib for responsive design - react-native-size-matters

  // console.log(Dimensions.get("screen")); 
  // const PHONE_HEIGHT = Dimensions.get("screen").height; // lấy chiều cao của
  // const PHONE_WIDTH = Dimensions.get("screen").width; // lấy chiều

  const onButtonPress = () => Alert.alert("Button Pressed!"); // tạp ra alert : component cần dc khai báo khi nút được nhấn
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.introbig}
      >Welcome to markMapp!
      </Text>

      <Text
        style={styles.introsmall}>
        Your simple app for your {Platform.OS === "android" ? "Android" : "IOS"} Mark Manager.
      </Text>

      <Button
        title="Get Started"
        onPress={onButtonPress} // khi nút được nhấn, hàm onButtonPress sẽ được gọi
      />


      <Pressable onPress={onButtonPress} >
        <Image
          source={{ uri: "https://picsum.photos/id/1/200/300" }}
          style={styles.image}
        />
      </Pressable>

      <TextInput
        
        placeholder="Type here to translate!"
        placeholderTextColor="grey"
      />


    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "android" ? 'grey' : 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introbig: {
    color: 'white', fontSize: 50, fontWeight: 'bold', textAlign: 'center'
  },
  introsmall: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  image: {
    width: 200,
    height: 300,
    margin: 20,
  },
});


//safe zone
// đây là một vùng an toàn để viết code, tránh các lỗi không cần thiết
// bạn có thể thêm các component khác vào đây, ví dụ như Button, Image, TextInput, v.v.