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

// Ganti RootStackParamList sesuai dengan definisi navigator kamu
type RootStackParamList = {
  Home: undefined;
  Fuzzy: undefined;
};

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

const UkurScreen: React.FC<Props> = ({ navigation }) => {
    const [suhu, setSuhu] = useState<string | null>(null);
    const [jantung, setJantung] = useState<string | null>(null);
    const [oksigen, setOksigen] = useState<string | null>(null);

    const fetchData = async () => {
        try {
          const resSuhu = await fetch("https://fahrirs.pythonanywhere.com/getSuhu");
          const suhuJson = await resSuhu.json();
          console.log('Suhu response:', suhuJson);

          const resJantung = await fetch("https://fahrirs.pythonanywhere.com/getJantung");
          const jantungJson = await resJantung.json();
          console.log('Jantung response:', jantungJson);

          const resOksigen = await fetch("https://fahrirs.pythonanywhere.com/getOksigen");
          const oksigenJson = await resOksigen.json();
          console.log('Oksigen response:', oksigenJson);

          const suhuValue = suhuJson.value || suhuJson;
          const jantungValue = jantungJson.value || jantungJson;
          const oksigenValue = oksigenJson.value || oksigenJson;

          console.log('Extracted values:', { suhuValue, jantungValue, oksigenValue });

          setSuhu(suhuValue);
          setJantung(jantungValue);
          setOksigen(oksigenValue);

          if (suhuValue !== null && suhuValue !== undefined) {
            await AsyncStorage.setItem('suhu', String(suhuValue));
            console.log('Saved suhu:', suhuValue);
          }
          if (jantungValue !== null && jantungValue !== undefined) {
            await AsyncStorage.setItem('jantung', String(jantungValue));
            console.log('Saved jantung:', jantungValue);
          }
          if (oksigenValue !== null && oksigenValue !== undefined) {
            await AsyncStorage.setItem('oksigen', String(oksigenValue));
            console.log('Saved oksigen:', oksigenValue);
          }

        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
    
    // 🔹 Fetch when screen mounts
    useEffect(() => {
    fetchData();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titlePage}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.imageHeader} source={require('../assets/arrow_back.png')} />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Ukur Alat</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.textSection}>Ukur Kesehatan Mu</Text>

        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            style={{ marginTop: 60}}
        >
            <Image style={{marginRight: 20, marginLeft: 30}} source={require('../assets/page1.png')} />
            <Image style={{marginRight: 20, marginLeft: 60}} source={require('../assets/page2.png')} />
            <Image style={{marginRight: 20, marginLeft: 40}} source={require('../assets/page3.png')} />
        </ScrollView>

        <View style={styles.healthCard}>
            <Text style={styles.healthTitle}>Hasil Deteksi</Text>
            <View style={styles.healthRow}>

            <View style={styles.cardBorder}>
                <Text style={styles.cardText}>Suhu</Text>
                <View style={styles.cardContent}>
                <View>
                    <Text style={styles.cardNum}>{suhu}</Text>
                    <Text style={styles.cardNum}>Celsius</Text>
                </View>
                </View>
            </View>

            <View style={styles.cardBorder}>
                <Text style={styles.cardText}>Heartrate</Text>
                <View style={styles.cardContent}>
                <View>
                    <Text style={styles.cardNum}>{jantung}</Text>
                    <Text style={styles.cardNum}>bpm</Text>
                </View>
                </View>
            </View>

            <View style={styles.cardBorder}>
                <Text style={styles.cardText}>Oksigen</Text>
                <View style={styles.cardContent}>
                <View>
                    <Text style={styles.cardNum}>{oksigen}</Text>
                    <Text style={styles.cardNum}>%</Text>
                </View>
                </View>
            </View>
            </View>
        </View>

        <ScrollView style={{ width: '100%', height: '10%',marginLeft: '8%', marginTop: 10 }}>
            <TouchableOpacity style={styles.cardActivity} onPress={() => navigation.navigate('Fuzzy')}>
            <Image style={styles.cardIconSmall} source={require('../assets/noteIcon.png')} />
            <Text style={styles.cardFont}>Kalkulasi Fuzzy</Text>
            <Image style={styles.cardIconSmall} source={require('../assets/arrowIcon.png')} />
            </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default UkurScreen;

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

  healthCard: {
    marginTop: '10%',
    width: '90%',
    height: '28%',
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
    width: '29%',
    borderRadius: 10,
    padding: 10,
  },
  cardText: { fontSize: 15, fontWeight: '700', fontFamily: 'inter', marginBottom: '15%'},
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, gap: 15, width: '100%' },
  cardNum: { fontWeight: '700', fontSize: 15, textAlign:'center'},

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
