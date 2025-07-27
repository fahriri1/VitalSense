import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'expo-datepicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Ubah sesuai struktur stack navigator milikmu
type RootStackParamList = {
  Splash: undefined;
  Daftar2: undefined;
  Login: undefined;
};

type DaftarScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const DaftarScreen: React.FC<DaftarScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [usernamefamily, setUsernameFamily] = useState<string>('');
  const [umur, setUmur] = useState<string>('');
  const [jeniskelamin, setJenisKelamin] = useState<string>('');
  const [datechoose, setDateChoose] = useState<string>('Pilih tanggal'); // or use Date
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phonefamily, setPhoneFamily] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  const handleDaftar = async () => {
    if (username !== '' && email !== '' && phone !== '') {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('usernamefamily', usernamefamily);
        await AsyncStorage.setItem('umur', umur);
        await AsyncStorage.setItem('jeniskelamin', jeniskelamin);
        await AsyncStorage.setItem('datechoose', datechoose);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('phone', phone);
        await AsyncStorage.setItem('phonefamily', phonefamily);
        navigation.replace('Daftar2');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      alert('Komponen data tidak boleh kosong');
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Pilih tanggal</Text>
            <DatePicker date={datechoose} onChange={setDateChoose} />
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{
                backgroundColor: '#05696b',
                padding: 10,
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Set Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
        <Image
          source={require('../assets/arrow_back.png')}
          style={[styles.arrow, styles.icon]}
        />
      </TouchableOpacity>

      {/* Progress Daftar */}
      <View style={styles.progresDaftar}>
        <Text style={styles.tahapDaftar}>1</Text>
        <View>
          <Text style={styles.textDaftar}>Data diri</Text>
          <Text style={styles.textDaftar}>(Registrasi Data)</Text>
        </View>
        <View style={styles.garis}></View>
        <Text style={[styles.tahapDaftar, styles.notSelected]}>2</Text>
        <View>
          <Text style={[styles.textDaftar, styles.noteSelectedText]}>
            Data riwayat
          </Text>
          <Text style={[styles.textDaftar, styles.noteSelectedText]}>
            (Registrasi riwayat)
          </Text>
        </View>
      </View>

      {/* Data Diri */}
      <View style={styles.section2}>
        <Text style={styles.textColumn}>Data Diri</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Masukan Nama Lengkap"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Umur"
            keyboardType="numeric"
            value={umur}
            onChangeText={setUmur}
          />
        </View>

        <View style={styles.input}>
          <Picker
            style={{ width: 320, marginLeft: 5 }}
            selectedValue={jeniskelamin}
            onValueChange={(itemValue) => setJenisKelamin(itemValue)}
          >
            <Picker.Item
              style={{ color: 'gray', fontSize: 14 }}
              label="Jenis Kelamin"
              value=""
            />
            <Picker.Item
              style={{ fontSize: 14 }}
              label="Laki-laki"
              value="laki-laki"
            />
            <Picker.Item
              style={{ fontSize: 14 }}
              label="Perempuan"
              value="perempuan"
            />
          </Picker>
        </View>

        <TouchableOpacity style={styles.input} onPress={() => setModal(true)}>
            <Text style={{ 
            color: datechoose === 'Pilih tanggal' ? 'grey' : 'black', 
            width: 280 
            }}>
            {datechoose}
            </Text>
        </TouchableOpacity>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Masukan Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.form}
            keyboardType="phone-pad"
            placeholder="Masukan No Telfon"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>

      {/* Data Keluarga */}
      <View style={styles.section2}>
        <Text style={styles.textColumn}>Data Keluarga</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.form}
            keyboardType="phone-pad"
            placeholder="Masukan No Telfon Keluarga"
            value={phonefamily}
            onChangeText={setPhoneFamily}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Hubungan dengan Keluarga"
            value={usernamefamily}
            onChangeText={setUsernameFamily}
          />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[styles.buttonMasuk, styles.button]}
        onPress={handleDaftar}
      >
        <Text style={styles.buttonText}>Selanjutnya</Text>
      </TouchableOpacity>

      <View style={styles.viewTextDaftarDisini}>
        <Text style={styles.textLabel}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.textLabel, styles.textCTA]}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: 'color'},

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
    notSelected:{backgroundColor: 'gray'},
    noteSelectedText:{color: 'gray'},
    garis:{height: 2, width: 60, backgroundColor: 'gray', marginRight: 10},
    textDaftar:{fontSize: 12, fontWeight: 700, marginRight: 5},

    section1:{left: 45, top: 90},
    textColumn:{fontSize: 12, fontWeight: 700, marginBottom: 5},

    // Form Styles //
    section2:{top: 120, left: 45},
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
        top: 180,
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

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 15,
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 20,
    },

    checkboxContainer: { flexDirection: 'row', alignItems: 'center', top: 150, left: 45},
});

export default DaftarScreen;
