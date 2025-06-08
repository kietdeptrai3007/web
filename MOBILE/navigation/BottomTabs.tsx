import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AboutMe from '../src/screens/AboutMe';
import AboutThisUni from '../src/screens/AboutthisUni';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }} >
      <Tab.Screen options={{title: "Me"}} name="AboutMe" component={AboutMe} />
      <Tab.Screen options={{title: "HUST"}} name="AboutThisUni" component={AboutThisUni} />
    </Tab.Navigator>
  );
}