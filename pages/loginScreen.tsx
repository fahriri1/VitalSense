import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { database, get, ref } from '../firebaseConfig';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/type'; // adjust this path

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const phoneRef = ref(database, `vitalsense/user/${phone}/telfon`);
      const phoneSnap = await get(phoneRef);

      const passwordRef = ref(database, `vitalsense/user/${phone}/password`);
      const passwordSnap = await get(passwordRef);

      if (!phoneSnap.exists()) {
        Alert.alert('Gagal', 'Anda belum terdaftar');
        return;
      }

      if (!passwordSnap.exists()) {
        Alert.alert('Gagal', 'Password salah');
        return;
      }

      const phone_ = phoneSnap.val();
      const password_ = passwordSnap.val();

      if (phone === phone_ && password === password_) {
        navigation.replace('Home');
      } else {
        Alert.alert('Gagal', 'No. Telfon atau password salah');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Terjadi kesalahan', 'Silakan coba lagi');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
        <Image
          source={require('../assets/arrow_back.png')}
          style={[styles.arrow, styles.icon]}
        />
      </TouchableOpacity>

      <Image
        source={require('../assets/mainLogo.png')}
        style={styles.logo}
      />

      <Text style={styles.header}>MASUK</Text>

      <View style={styles.input}>
        <Image
          source={require('../assets/call-outline.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.form}
          placeholder="Masukan No Telfon"
          placeholderTextColor={"gray"}
          keyboardType="email-address"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.input}>
        <Image
          source={require('../assets/lock_icon_black.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.form}
          placeholder="Masukan Kata Sandi"
          placeholderTextColor={"gray"}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <Text style={[styles.text1, styles.textLabel]}>Lupa Password?</Text>

      <TouchableOpacity style={[styles.buttonMasuk, styles.button]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      <View style={styles.viewTextDaftarDisini}>
        <Text style={styles.textLabel}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Daftar')}>
          <Text style={[styles.textLabel, styles.textCTA]}>Daftar disini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center' },
    logo: { width: 174, height: 158, top: 100 },
    arrow: { top: 63, right: 165 },
    icon: { width: 24, height: 24 },
    header: { fontWeight: '700', fontSize: 28, top: 90 },
  
    input: {
      top: 110,
      width: 328,
      height: 40,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
    },
    form: { width: 262, color:'black'},
  
    textLabel: { color: 'black', fontSize: 12, fontWeight: '600' },
    text1: { top: 105, left: 105 },
  
    button: {
      width: 328,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#05696b',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
    },
  
    buttonMasuk: {
      top: 125,
    },
  
    viewTextDaftarDisini: {
      flexDirection: 'row',
      justifyContent: 'center',
      top: 140,
    },
    textCTA: {
      marginLeft: 5,
      color: '#05696b',
    },
  });  

export default LoginScreen;
