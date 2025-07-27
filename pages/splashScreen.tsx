import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

// 👇 Adjust this to match your actual stack param list
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Daftar: undefined;
};

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
  route?: RouteProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Image
        source={require('../assets/mainIlustration.jpg')}
        style={styles.logo}
      />

      <TouchableOpacity
        style={[styles.tombolMasuk, styles.tombol]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.textButtonMasuk, styles.textButton]}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tombolDaftar, styles.tombol]}
        onPress={() => navigation.navigate('Daftar')}
      >
        <Text style={[styles.textButtonDaftar, styles.textButton]}>Daftar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginBottom: 150,
    marginTop: 200,
    width: '80%',
    height: '30%',
  },
  tombol: {
    borderRadius: 5,
    width: 253,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontWeight: '700' as '700',
    fontSize: 14,
  },
  tombolMasuk: {
    borderWidth: 1,
    borderColor: '#05696b',
  },
  tombolDaftar: {
    backgroundColor: '#05696b',
    marginTop: 20,
  },
  textButtonDaftar: {
    color: 'white',
  },
  textButtonMasuk: {
    color: '#05696b',
  },
});
