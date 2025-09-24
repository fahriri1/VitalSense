import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Ukur: undefined;
  Info: undefined;
  History: undefined;
  Akun: undefined;
  InfoHipertensi: undefined;
  InfoDietHipertensi: undefined;
  InfoKolesterol: undefined;
  InfoDietKolesterol: undefined;
  InfoCerdik: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

export default function HomeScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({
    inter: require('../assets/font/Inter-VariableFont_opsz,wght.ttf'),
  });

  const [storedUsername, setStoredUsername] = useState<string | null>('');

  const getUsername = async () => {
    const value = await AsyncStorage.getItem('username');
    setStoredUsername(value);
  };

  const handlePress = async () => {
    try {
      const response = await fetch("https://fahrirs.pythonanywhere.com/getParameter", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const text = await response.text(); 
      Alert.alert("Server Response", text);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <View style={style.background}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
        <View style={{ marginLeft: '8%', marginRight: 'auto' }}>
          <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'inter' }}>Halo,</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', fontFamily: 'inter' }}>
            {storedUsername}
          </Text>
        </View>
        <Image
          source={require('../assets/mainLogo.png')}
          style={{ width: 100, height: 100, marginLeft: 'auto', marginRight: '3%' }}
        />
      </View>

      <View style={style.healthCard}>
        <Text style={style.healthTitle}>Indikator Normal</Text>
        <View style={style.healthRow}>
          <View style={style.cardBorder}>
            <Text style={style.cardText}>Detak Jantung</Text>
            <View style={style.cardContent}>
              <View>
                <Text style={style.cardNum}>60-100</Text>
                <Text style={style.cardNum}>BPM</Text>
              </View>
              <Image source={require('../assets/iconTekanan.png')} style={style.cardIcon} />
            </View>
          </View>
          <View style={style.cardBorder}>
            <Text style={style.cardText}>Suhu Tubuh</Text>
            <View style={style.cardContent}>
              <View>
                <Text style={style.cardNum}>35</Text>
                <Text style={style.cardNum}>selsius</Text>
              </View>
              <Image source={require('../assets/iconFat.png')} style={style.cardIcon} />
            </View>
          </View>
        </View>
      </View>

      <Text style={style.aktivitasTitle}>Aktivitas:</Text>

      <ScrollView style={{ width: '100%', height: '10%',marginLeft: '8%' }}>
        <TouchableOpacity style={style.cardActivity} onPress={() => navigation.navigate('Ukur')}>
          <Image style={style.cardIconSmall} source={require('../assets/noteIcon.png')} />
          <Text style={style.cardFont}>Ukur</Text>
          <Image style={style.cardIconSmall} source={require('../assets/arrowIcon.png')} />
        </TouchableOpacity>
      </ScrollView>

      <View style={style.navigationBar}>
        <TouchableOpacity style={style.navigationIcon}>
          <Image style={style.icon} source={require('../assets/home_icon.png')} />
          <Text style={[style.textIconSlected, style.textIcon]}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.navigationIcon} onPress={() => navigation.navigate('History')}>
          <Image style={style.icon} source={require('../assets/admin_icon.png')} />
          <Text style={style.textIcon}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.navigationIcon} onPress={() => navigation.navigate('Akun')}>
          <Image style={style.icon} source={require('../assets/account_icon.png')} />
          <Text style={style.textIcon}>Akun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type InfoCardProps = {
    title: string;
    description: string;
    image: ImageSourcePropType;
    onPress: () => void;
};

const InfoCard = ({ title, description, image, onPress }: InfoCardProps) => (
    <TouchableOpacity style={style.choiceContainer} onPress={onPress}>
      <Image style={style.imageChoice} source={image} />
      <View style={style.textContainer}>
        <Text style={style.headerChoice}>{title}</Text>
        <Text style={style.textChoice}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

const style = StyleSheet.create({
    background: { flex: 1, backgroundColor: 'white' },
  
    healthCard: {
      marginTop: '5%',
      width: '90%',
      height: '23%',
      marginHorizontal: '5%',
      borderRadius: 25,
      backgroundColor: '#05696b',
      padding: 20,
    },
    healthTitle: { color: 'white', fontFamily: 'inter', fontSize: 13, fontWeight: '700' },
    healthRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  
    cardBorder: {
      backgroundColor: 'white',
      height: 130,
      width: '48%',
      borderRadius: 10,
      padding: 10,
    },
    cardText: { fontSize: 15, fontWeight: '700', fontFamily: 'inter' },
    cardContent: { flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 15 },
    cardIcon: { width: 60, height: 60 },
    cardNum: { fontWeight: '700', fontSize: 18 },
  
    aktivitasTitle: {
      alignItems: 'center',
      width: '85%',
      fontSize: 15,
      fontWeight: '600',
      marginTop: 20,
      marginHorizontal: 'auto',
    },
  
    cardFont: {
      color: 'white',
      fontWeight: '600',
      fontSize: 15,
      width: 200,
      marginHorizontal: 10,
    },
    cardActivity: {
      backgroundColor: '#05696b',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 10,
      width: '85%',
      marginTop: 10,
    },
    cardIconSmall: { width: 30, height: 30 },
  
    navigationBar: { flexDirection: 'row', justifyContent: 'center', height: 70, zIndex: 2, marginBottom: '8%'},
    navigationIcon: {
      marginHorizontal: 40,
      marginTop: 15,
      marginBottom: 5,
      alignItems: 'center',
    },
    icon: { width: 25, height: 25 },
    textIcon: { fontSize: 10, fontWeight: '500', color: '#05696b' },
    textIconSlected: { fontWeight: '700' },

    // Choice
    choiceContainer: {
        width: 350,
        backgroundColor: '#05696b',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: '8%'
    },
    imageChoice: {
        width: 80,
        height: 80,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    textContainer: { marginTop: 10, marginLeft: 10 },
    headerChoice: { fontSize: 15, color: 'white', fontWeight: '600' },
    textChoice: { fontSize: 12, color: 'white' }
  });
  