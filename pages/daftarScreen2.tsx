import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType, TextInput
} from 'react-native';
import { database, ref, set } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export default function DaftarScreen2({ navigation }: Props) {
  const [berat, setBerat] = useState<string>('');
  const [tinggi, setTinggi] = useState<string>('');
  const [riwayat, setRiwayat] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [ConfirmPassword, setConfirmPassword] = useState<string>('');

  const [checkedTerm, setIsCheckedTerm] = useState<ImageSourcePropType>(require('../assets/check_box.png'));
  const [checkedData, setIsCheckedData] = useState<ImageSourcePropType>(require('../assets/check_box.png'));

  const handleDaftar = async () => {
    if (ConfirmPassword === password) {
      if (
        checkedData === require('../assets/check_box_fill.png') &&
        checkedTerm === require('../assets/check_box_fill.png')
      ) {
        if (berat && tinggi && riwayat && password) {
          try {
            await AsyncStorage.setItem('berat', berat);
            await AsyncStorage.setItem('tinggi', tinggi);
            await AsyncStorage.setItem('riwayat', riwayat);
            await AsyncStorage.setItem('password', password);
            await saveDaftar();
            navigation.replace('Home');
          } catch (error) {
            alert('Error saving data: ' + error);
          }
        } else {
          alert('Komponen data tidak boleh kosong');
        }
      } else {
        alert('Mohon Isi Persetujuan');
      }
    } else {
      alert('Mohon Konfirmasi Password');
    }
  };

  const saveDaftar = async () => {
    const username = await AsyncStorage.getItem('username');
    const umur = await AsyncStorage.getItem('umur');
    const jeniskelamin = await AsyncStorage.getItem('jeniskelamin');
    const tanggallahir = await AsyncStorage.getItem('datechoose');
    const email = await AsyncStorage.getItem('email');
    const phone = await AsyncStorage.getItem('phone');
    const phonefamily = await AsyncStorage.getItem('phonefamily');
    const usernamefamily = await AsyncStorage.getItem('usernamefamily');

    if (!phone) return;

    await set(ref(database, 'vitalsense/user/' + phone), {
      nama: username,
      umur,
      jeniskelamin,
      tanggallahir,
      email,
      telfon: phone,
      telfonkeluarga: phonefamily,
      hubungankeluarga: usernamefamily,
      berat,
      tinggi,
      riwayat,
      password,
    })
      .then(() => console.log('Data saved successfully for phone: ', phone))
      .catch((error) => console.error('Error saving data:', error));
  };

  const toggleImage1 = () => {
    setIsCheckedTerm((prevImage) =>
      prevImage === require('../assets/check_box.png')
        ? require('../assets/check_box_fill.png')
        : require('../assets/check_box.png')
    );
  };

  const toggleImage2 = () => {
    setIsCheckedData((prevImage) =>
      prevImage === require('../assets/check_box.png')
        ? require('../assets/check_box_fill.png')
        : require('../assets/check_box.png')
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Daftar')}>
        <Image source={require('../assets/arrow_back.png')} style={[styles.arrow, styles.icon]} />
      </TouchableOpacity>

      <View style={styles.progresDaftar}>
        <Text style={styles.tahapDaftar}>1</Text>
        <View>
          <Text style={styles.textDaftar}>Data diri</Text>
          <Text style={styles.textDaftar}>(Registrasi Data)</Text>
        </View>

        <View style={styles.garis}></View>

        <Text style={styles.tahapDaftar}>2</Text>
        <View>
          <Text style={styles.textDaftar}>Data riwayat</Text>
          <Text style={styles.textDaftar}>(Registrasi Riwayat)</Text>
        </View>
      </View>

      <View style={styles.section1}>
        <Text style={styles.textColumn}>Data Kesehatan</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Tinggi Badan"
            keyboardType="numeric"
            value={tinggi}
            onChangeText={setTinggi}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Berat Badan"
            keyboardType="numeric"
            value={berat}
            onChangeText={setBerat}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Riwayat Penyakit"
            value={riwayat}
            onChangeText={setRiwayat}
          />
        </View>
      </View>

      <View style={styles.section1}>
        <Text style={styles.textColumn}>Data Password</Text>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Masukan Kata Sandi"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Konfirmasi Kata Sandi"
            secureTextEntry
            value={ConfirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <Pressable onPress={toggleImage2} style={styles.checkboxContainer}>
        <Image source={checkedData} style={styles.icon} />
        <Text style={styles.textLabel}>Data yang Saya Isikan telah Sesuai dan Benar</Text>
      </Pressable>

      <Pressable onPress={toggleImage1} style={styles.checkboxContainer}>
        <Image source={checkedTerm} style={styles.icon} />
        <Text style={styles.textLabel}>Saya Menyetujui</Text>
        <TouchableOpacity>
          <Text style={[styles.textLabel, styles.textCTA]}>Syarat & Ketentuan </Text>
        </TouchableOpacity>
        <Text style={styles.textLabel}>yang Berlaku</Text>
      </Pressable>

      <TouchableOpacity style={[styles.buttonMasuk, styles.button]} onPress={handleDaftar}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      <View style={styles.viewTextDaftarDisini}>
        <Text style={styles.textLabel}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.textLabel, styles.textCTA]}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: 'white'},

    logo: { width: 174, height: 70, top: 120, left: 108},
    arrow: { top:63, left:24},
    icon: {width: 24, height: 24},
    header: { fontWeight: 700, fontSize: 28, top: 125, left: 142},

    progresDaftar: {flexDirection: 'row', alignItems:'center', left: 30, top: 70},
    tahapDaftar: {
        textAlign: 'center',
        backgroundColor: '#05696b', 
        color: 'white', 
        fontWeight: 600,
        width: 25, 
        height: 25,
        borderRadius: 50,
        marginRight: 10,
    },
    garis:{height: 2, width: 60, backgroundColor: 'gray', marginRight: 10},
    textDaftar:{fontSize: 12, fontWeight: 700, marginRight: 5},

    section1:{left: 45, top: 120},
    textColumn:{fontSize: 12, fontWeight: 700, marginBottom: 10},

    // Form Styles //
    input: {
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
    form: { width: 280},

    textLabel: {color: 'black', fontSize: 12, fontWeight: 600,},
    text1: {top: 185, left: 255},

    // Button Styles //
    button: {
        width: 328,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#05696b',
        borderRadius: 10,
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 700,
        color: 'white',
    },

    buttonMasuk:{
        top: 170,
        left: 45,
    },

    viewTextDaftarDisini: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        top: 200,
    },
    textCTA: {
        marginLeft: 5,
        color: '#05696b',
    }, 

    checkboxContainer: { flexDirection: 'row', alignItems: 'center', top: 140, left: 45, marginBottom: 10},
});