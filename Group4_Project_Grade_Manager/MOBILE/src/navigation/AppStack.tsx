import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

// Screens
import StudentListScreen from '../screens/admin/StudentListScreen';
import StudentDetailScreen from '../screens/admin/StudentDetailScreen';
import MyGradesScreen from '../screens/user/MyGradesScreen';
import ContactScreen from '../screens/user/ContactScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AdminTabs = () => (
  <Tab.Navigator screenOptions={tabScreenOptions}>
    <Tab.Screen name="Students" component={StudentListScreen} options={{ title: 'Sinh viên', headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} /> }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân', tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} /> }} />
  </Tab.Navigator>
);

const UserTabs = () => (
  <Tab.Navigator screenOptions={tabScreenOptions}>
    <Tab.Screen name="MyGrades" component={MyGradesScreen} options={{ title: 'Bảng điểm', tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} /> }} />
    <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Liên hệ', tabBarIcon: ({ color, size }) => <Ionicons name="mail" color={color} size={size} /> }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân', tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} /> }} />
  </Tab.Navigator>
);


const AppStack = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#A90000' }, headerTintColor: '#FFF' }}>
                {user?.role === 'admin' ? (
                    <>
                        <Stack.Screen name="AdminHome" component={AdminTabs} options={{ headerShown: false }}/>
                        <Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'Chi tiết sinh viên' }}/>
                    </>
                ) : (
                     <Stack.Screen name="UserHome" component={UserTabs} options={{ headerShown: false }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const tabScreenOptions = {
    tabBarActiveTintColor: '#A90000',
    tabBarInactiveTintColor: 'gray',
    headerStyle: { backgroundColor: '#A90000' },
    headerTintColor: '#FFF',
    headerTitleStyle: { fontWeight: 'bold' }
};

export default AppStack;