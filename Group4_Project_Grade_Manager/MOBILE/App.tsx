// Quan trọng: Dòng này phải được đặt ở trên cùng
import 'react-native-gesture-handler'; 

import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}