import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { database, ref, update } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Ganti sesuai struktur stack navigator kamu
type RootStackParamList = {
  Akun: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Akun'>;
};

const UbahSandi: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const chanceFirebase = async () => {
    const phone = await AsyncStorage.getItem('phone');
    console.log('Updating password for:', phone, 'New Password:', password);

    if (phone) {
      await update(ref(database, `vitalsense/user/${phone}`), {
        password: password,
      })
        .then(() => console.log('Data saved successfully for phone:', phone))
        .catch((error) => console.error('Error saving data:', error));
    }
  };

  const handleChancePass = async () => {
    if (password === confirmPassword && password !== '') {
      try {
        await AsyncStorage.setItem('password', password);
        await chanceFirebase();
        setModalVisible(true);
      } catch (error) {
        alert('Error occur');
      }
    } else {
      alert('Data password belum sesuai');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlePage}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Akun')}>
            <Image
              style={styles.imageHeader}
              source={require('../../assets/arrow_back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Ubah Sandi</Text>
        </View>
      </View>

      <ScrollView>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Kata Sandi Anda Berhasil Diubah!</Text>
              <TouchableOpacity
                style={[styles.button, { width: 150 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.headerContainer}>
          <Text style={styles.passwordHeader}>Atur Ulang Kata Sandi</Text>
          <Text style={styles.passwordSubHeader}>Buat kata sandi baru</Text>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.inputLabel}>Masukan Kata Sandi Baru</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.form}
              placeholder="Masukan Kata Sandi"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.inputLabel}>Masukan Ulang Kata Sandi Baru</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.form}
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.buttonMasuk, styles.button]} onPress={handleChancePass}>
          <Text style={styles.buttonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UbahSandi;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  titlePage: { height: 80, elevation: 5, backgroundColor: 'white' },
  titleContainer: { top: 40, left: 20, flexDirection: 'row', alignItems: 'center' },
  imageHeader: { width: 24, height: 24 },
  textHeader: { marginLeft: 10, fontSize: 13, fontWeight: '700' },

  headerContainer: { alignItems: 'center', top: 100 },
  passwordHeader: { fontSize: 15, fontWeight: '700' },
  passwordSubHeader: { fontSize: 12, fontWeight: '400' },

  containerInput: { top: 180, left: 45 },
  inputLabel: { fontSize: 15, fontWeight: '700', marginBottom: 5 },
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
  form: { width: 280 },

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
    top: 200,
    left: 45,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
  },
});
