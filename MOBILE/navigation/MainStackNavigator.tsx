import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import HomePagestd from "../src/screens/HomePagestd";
import LoginPage from "../src/screens/LoginPage";
import WelcomeScreen from "../src/screens/WelcomeScreen";
import HomePageltr from "../src/screens/HomePageltr";
function MainStackNavigator(){
  return (
    <Stack.Navigator>
        <Stack.Screen name = "Welcome" component={WelcomeScreen} />
        <Stack.Screen name = "HomePagestd" component={HomePagestd} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePageltr" component={HomePageltr} />
   
    </Stack.Navigator>
  );
}

export default MainStackNavigator;