import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Akun: undefined;
  Kelola: undefined;
  Contact: undefined;
  Sandi: undefined;
  Splash: undefined;
};

type AkunScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Akun'>;
};

const AkunScreen: React.FC<AkunScreenProps> = ({ navigation }) => {
  const [storedUsername, setStoredUsername] = useState<string>('');

  const getUsername = async () => {
    const value = await AsyncStorage.getItem('username');
    if (value) setStoredUsername(value);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContainer}>
        {/* Main Section */}
        <View style={styles.containerUsername}>
          <Image style={styles.imageUsername} source={require('../assets/username.png')} />
          <Text style={styles.username}>{storedUsername}</Text>
        </View>

        <TouchableOpacity
          style={[styles.container1, styles.containerChoise]}
          onPress={() => navigation.navigate('Kelola')}
        >
          <Image style={styles.iconChoise} source={require('../assets/account_icon.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>Kelola Akun</Text>
            <Text style={styles.textChoise}>Lihat dan Atur Akun Anda</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.container2, styles.containerChoise]}
          onPress={() => navigation.navigate('Contact')}
        >
          <Image style={styles.iconChoise} source={require('../assets/call-outline_main.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>Contact</Text>
            <Text style={styles.textChoise}>Pusat Bantuan dan Hubungi Kami</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.container3, styles.containerChoise]}
          onPress={() => navigation.navigate('Sandi')}
        >
          <Image style={styles.iconChoise} source={require('../assets/lock_icon.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>Ubah Sandi</Text>
            <Text style={styles.textChoise}>Ubah Sandi Anda</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.container4, styles.containerChoise]}
          onPress={() => navigation.navigate('Splash')}
        >
          <Image style={styles.iconBacaNanti} source={require('../assets/exit_icon.png')} />
          <View style={styles.containerText2}>
            <Text style={styles.headerChoise}>Keluar</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navigationIcon} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.icon} source={require('../assets/home_icon.png')} />
          <Text style={styles.textIcon}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationIcon} onPress={() => navigation.navigate('History')}>
          <Image style={styles.icon} source={require('../assets/admin_icon.png')} />
          <Text style={styles.textIcon}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationIcon}>
          <Image style={styles.icon} source={require('../assets/account_icon.png')} />
          <Text style={styles.textIcon}>Akun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: 'white'},

    // Main Container //
    mainContainer:{top: 70},

    // Username //
    containerUsername:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 328,
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        top: 40,
        left: 37,
    },
    imageUsername: {width: 45, height: 45, left: 10},
    username: {fontSize: 16, fontWeight: 700, left: 20},

    // Choise //
    containerChoise:{ 
        width: 350,
        height: 50,
        top: 40,
        left: 20,
        marginTop: 20,
        borderBottomWidth: 0.5,
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    container1:{paddingLeft: 16},
    containerText: {paddingLeft: 16},

    container2:{paddingLeft: 20},
    containerText2: {paddingLeft: 20},

    container3:{paddingLeft: 16},
    container4:{paddingLeft: 16},

    iconChoise: { width: 20, height: 20},
    iconBacaNanti: { width: 12, height: 18},
    headerChoise: {fontSize: 12, fontWeight: 500}, 
    textChoise: {fontSize: 9, fontWeight: 400, color: '#98A2B3'},

    // Navigation //
    navigationBar: { flexDirection: 'row', justifyContent: 'center', height:70, zIndex: 2, marginBottom: '8%'},
    navigationIcon: {
        marginRight: 40, 
        marginLeft: 40, 
        marginTop: 15, 
        marginBottom: 5, 
        alignItems: 'center'
    },
    icon: {width: 25, height: 25},
    textIcon: {fontSize: 10, fontWeight: 500, color:'#05696b'}
});

export default AkunScreen;
