import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database, ref, push } from '../firebaseConfig';

// Ganti RootStackParamList sesuai dengan definisi navigator kamu
type RootStackParamList = {
  Home: undefined;
};

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

const FuzzyScreen: React.FC<Props> = ({ navigation }) => {
    const [fuzzy, setFuzzy] = useState<string | null>(null);
    const [suhu_, setSuhu] = useState<string | null>(null);
    const [jantung_, setJantung] = useState<string | null>(null);
    const [oksigen_, setOksigen] = useState<string | null>(null);

    const getSuhuStatus = (suhuValue: string | null): string => {
        if (!suhuValue) return '';
        const temp = parseFloat(suhuValue);
        if (temp > 37.4) return 'meningkat';
        if (temp < 36.2) return 'menurun';
        return 'normal';
    };

    const getOksigenStatus = (oksigenValue: string | null): string => {
        if (!oksigenValue) return '';
        const oxygen = parseFloat(oksigenValue);
        if (oxygen > 95) return 'normal';
        if (oxygen < 90) return 'menurun drastis';
        return 'menurun';
    };

    const getJantungStatus = (jantungValue: string | null): string => {
        if (!jantungValue) return '';
        const heartRate = parseFloat(jantungValue);
        if (heartRate > 130) return 'meningkat drastis';
        if (heartRate > 100) return 'meningkat';
        if (heartRate < 40) return 'menurun drastis';
        if (heartRate < 60) return 'menurun';
        return 'normal';
    };

    const saveDaftar = async () => {
      const suhu = await AsyncStorage.getItem('suhu');
      const jantung = await AsyncStorage.getItem('jantung');
      const oksigen = await AsyncStorage.getItem('oksigen');

      setSuhu(suhu);
      setJantung(jantung);
      setOksigen(oksigen);
  
      await push(ref(database, 'vitalsense/update'), {
        update: fuzzy,
        suhu: suhu,
        jantung: jantung,
        oksigen: oksigen
      })
        .then(() => console.log('Data saved successfully'))
        .catch((error) => console.error('Error saving data:', error));
    };

    const fetchData = async () => {
        try {
          const resFuzzy = await fetch("https://fahrirs.pythonanywhere.com/getFuzzy");
          const fuzzyJson = await resFuzzy.text();
    
          setFuzzy(fuzzyJson);
        } catch (error) {
          console.error("Fetch error:", error);
        } 
      };
    
    // 🔹 Load AsyncStorage data
    const loadStoredData = async () => {
      const suhu = await AsyncStorage.getItem('suhu');
      const jantung = await AsyncStorage.getItem('jantung');
      const oksigen = await AsyncStorage.getItem('oksigen');

      console.log('Loaded data:', { suhu, jantung, oksigen });

      setSuhu(suhu);
      setJantung(jantung);
      setOksigen(oksigen);
    };

    // 🔹 Fetch when screen mounts
    useEffect(() => {
      fetchData();
      loadStoredData();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titlePage}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.imageHeader} source={require('../assets/arrow_back.png')} />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Hasil Fuzzy</Text>
        </View>
      </View>

      <View style={styles.healthCard}>
          <Text style={styles.healthTitle}>Hasil Deteksi</Text>
          <View style={styles.healthRow}>

          <View style={styles.cardBorder}>
              <Text style={styles.cardText}>Suhu</Text>
              <View style={styles.cardContent}>
              <View>
                  <Text style={styles.cardNum}>{suhu_ || 'N/A'}</Text>
                  <Text style={styles.cardNum}>Celsius</Text>
                  {suhu_ && <Text style={styles.cardStatus}>{getSuhuStatus(suhu_)}</Text>}
              </View>
              </View>
          </View>

          <View style={styles.cardBorder}>
              <Text style={styles.cardText}>Heartrate</Text>
              <View style={styles.cardContent}>
              <View>
                  <Text style={styles.cardNum}>{jantung_ || 'N/A'}</Text>
                  <Text style={styles.cardNum}>bpm</Text>
                  {jantung_ && <Text style={styles.cardStatus}>{getJantungStatus(jantung_)}</Text>}
              </View>
              </View>
          </View>

          <View style={styles.cardBorder}>
              <Text style={styles.cardText}>Oksigen</Text>
              <View style={styles.cardContent}>
              <View>
                  <Text style={styles.cardNum}>{oksigen_ || 'N/A'}</Text>
                  <Text style={styles.cardNum}>%</Text>
                  {oksigen_ && <Text style={styles.cardStatus}>{getOksigenStatus(oksigen_)}</Text>}
              </View>
              </View>
          </View>
          </View>
      </View>

      <ScrollView>
        <Text style={styles.textSection}>Prediksi Kesehatan dengan Fuzzy</Text>

        <Image style={{left: 130, width: 150, height: 100, marginTop: '20%', }} source={require('../assets/mainLogo.png')} />

        <View style={{
          left: 37, 
          width: 328, 
          padding: 25,
          marginTop: '10%', 
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 20,
        }}>
          <Text style={{marginLeft: 10, marginRight: 10, fontWeight: '600'}}> {fuzzy} </Text>
        </View>

        <ScrollView style={{ width: '100%', height: '10%',marginLeft: '8%', marginTop: '10%' }}>
            <TouchableOpacity style={styles.cardActivity} onPress={async () => {await saveDaftar(); navigation.navigate('Home');}}>
            <Text style={styles.cardFont}>Simpan & Kembali</Text>
            <Image style={styles.cardIconSmall} source={require('../assets/arrowIcon.png')} />
            </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default FuzzyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  // Title Page //
  titlePage: { height: 80, elevation: 5, backgroundColor: 'white' },
  titleContainer: { top: 40, left: 20, flexDirection: 'row', alignItems: 'center' },
  imageHeader: { width: 24, height: 24 },
  textHeader: { marginLeft: 10, fontSize: 13, fontWeight: '700' },

  // Main //
  textSection: { fontSize: 15, fontWeight: '700', left: 37, width: 328, marginTop: 30 },
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

  healthCard: {
    marginTop: '10%',
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
    height: 140,
    width: '29%',
    borderRadius: 10,
    padding: 10,
  },
  cardText: { fontSize: 15, fontWeight: '700', fontFamily: 'inter', marginBottom: '15%'},
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, gap: 15, width: '100%' },
  cardNum: { fontWeight: '700', fontSize: 15, textAlign:'center'},
  cardStatus: { fontWeight: '600', fontSize: 12, textAlign: 'center', marginTop: 5, color: '#666' },

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
});
