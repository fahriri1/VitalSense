import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Ganti RootStackParamList sesuai dengan definisi navigator kamu
type RootStackParamList = {
  Akun: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Akun'>;
};

const KelolaAkun: React.FC<Props> = ({ navigation }) => {
  const [storedUsername, setStoredUsername] = useState<string | null>('');
  const [storedPhone, setStoredPhone] = useState<string | null>('');
  const [storedEmail, setStoredEmail] = useState<string | null>('');

  const getUsername = async () => {
    const value = await AsyncStorage.getItem('username');
    setStoredUsername(value);
  };

  const getPhone = async () => {
    const value = await AsyncStorage.getItem('phone');
    setStoredPhone(value);
  };

  const getEmail = async () => {
    const value = await AsyncStorage.getItem('email');
    setStoredEmail(value);
  };

  useEffect(() => {
    getUsername();
    getPhone();
    getEmail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titlePage}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Akun')}>
            <Image style={styles.imageHeader} source={require('../../assets/arrow_back.png')} />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Informasi Akun</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.textSection}>Data diri</Text>

        <TouchableOpacity style={[styles.container1, styles.containerChoise]}>
          <Image style={styles.iconChoise} source={require('../../assets/account_icon.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>{storedUsername}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.container3, styles.containerChoise]}>
          <Image style={styles.iconChoise} source={require('../../assets/call-outline_main.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>{storedPhone}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.container3, styles.containerChoise]}>
          <Image style={styles.iconChoise} source={require('../../assets/mail_icon.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>{storedEmail}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default KelolaAkun;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  // Title Page //
  titlePage: { height: 80, elevation: 5, backgroundColor: 'white' },
  titleContainer: { top: 40, left: 20, flexDirection: 'row', alignItems: 'center' },
  imageHeader: { width: 24, height: 24 },
  textHeader: { marginLeft: 10, fontSize: 13, fontWeight: '700' },

  // Main //
  textSection: { fontSize: 15, fontWeight: '700', left: 37, width: 328, top: 30 },
  containerChoise: {
    width: 328,
    height: 50,
    top: 20,
    left: 37,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  container1: { paddingLeft: 16 },
  containerText: { paddingLeft: 16 },

  container2: { paddingLeft: 16 },
  containerText2: { paddingLeft: 16 },

  container3: { paddingLeft: 16 },
  container4: { paddingLeft: 16 },

  iconChoise: { width: 20, height: 20 },
  iconBacaNanti: { width: 20, height: 20 },
  headerChoise: { fontSize: 12, fontWeight: '500' },
  textChoise: { fontSize: 9, fontWeight: '400', color: '#98A2B3' },
});
