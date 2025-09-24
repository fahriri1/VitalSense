import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../pages/splashScreen';
import LoginScreen from '../pages/loginScreen';
import DaftarScreen from '../pages/daftarScreen1';
import DaftarScreen2 from '../pages/daftarScreen2';

import HomeScreen from '../pages/homeScreen';
import HistoryScreen from '../pages/historyScreen';
import AkunScreen from '../pages/akunScreen';

import UkurScreen from '../pages/ukurScreen';
import FuzzyScreen from '../pages/fuzzyScreen';

import ContactScreen from '../pages/akun/contactScreen';
import KelolaAkun from '../pages/akun/kelolaAkunScreen';
import UbahSandi from '../pages/akun/ubahSandiScreen';

import { RootStackParamList } from './type'; // adjust path as needed

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Daftar" component={DaftarScreen} />
      <Stack.Screen name="Daftar2" component={DaftarScreen2} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Akun" component={AkunScreen} />
      
      <Stack.Screen name="Ukur" component={UkurScreen} />
      <Stack.Screen name="Fuzzy" component={FuzzyScreen} />

      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Kelola" component={KelolaAkun} />
      <Stack.Screen name="Sandi" component={UbahSandi} />
    </Stack.Navigator>
  );
}
