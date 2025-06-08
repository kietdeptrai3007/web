import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './navigation/BottomTabs';
import MainStackNavigator from './navigation/MainStackNavigator';
import { View } from 'react-native';
export default function App() {
  return (
    
      <NavigationContainer> 
        <MainStackNavigator />
      </NavigationContainer>

   
  );

}