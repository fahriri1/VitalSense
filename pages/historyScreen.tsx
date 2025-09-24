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
import { database, ref, onValue } from '../firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Notification = {
  id: string;
  title: string;
  suhu: string;
  jantung: string;
  oksigen: string;
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [update, setUpdate] = useState<Notification[]>([]);

  useEffect(() => {
    const notifRef = ref(database, 'vitalsense/update/');

    onValue(notifRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notifList: Notification[] = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].update,
          suhu: data[key].suhu,
          jantung: data[key].jantung,
          oksigen: data[key].oksigen,
        }));
        setUpdate(notifList);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 50 }}>
        {update.map((notif) => (
          <TouchableOpacity key={notif.id} style={styles.newsContainer as StyleProp<ViewStyle>}>
            <View style={styles.containerTextNews}>
              <Text style={styles.mainNews}>{notif.title}</Text>
              <View style={styles.subTextNews}>
                <Text style={styles.topikNews}>{notif.suhu}</Text>
                <Text style={styles.separatorNews}>.</Text>
                
                <Text style={styles.topikNews}>{notif.jantung}</Text>
                <Text style={styles.separatorNews}>.</Text>
                 
                <Text style={styles.topikNews}>{notif.oksigen}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navigationIcon} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.icon} source={require('../assets/home_icon.png')} />
          <Text style={styles.textIcon}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationIcon}>
          <Image style={styles.icon} source={require('../assets/admin_icon.png')} />
          <Text style={styles.textIcon}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationIcon} onPress={() => navigation.navigate('Akun')}>
          <Image style={styles.icon} source={require('../assets/account_icon.png')} />
          <Text style={styles.textIcon}>Akun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: 'white'},

    // Title Page //
    titlePage:{ height: 80, elevation: 5, backgroundColor: 'white'},
    titleContainer: {top: 40, left: 20, flexDirection: 'row', alignItems: 'center'},
    imageHeader: {width: 24, height: 24},
    textHeader: {marginLeft: 10, fontSize: 13, fontWeight: 700},

    newsContainer: {
        flexDirection: 'row', 
        left: 40, 
        height: 60,
        width: 328, 
        marginTop:20,
        paddingTop: 10,
        borderWidth: 1, 
        borderRadius: 10
    },
    containerTextNews: {paddingLeft: 10, width: 300}, 

    mainNews: {fontSize: 12, fontWeight: 500, width: 328, color: '#134B70'},

    subTextNews: {flexDirection: 'row'},
    topikNews: {fontSize: 9, fontWeight: 400, marginLeft: 5 ,color: '#134B70'},
    separatorNews: {fontSize: 35, bottom: 30, marginLeft: 5},
    waktuNews: {fontSize: 9, fontWeight: 400, left: 10, color: '#508C9B'},

    infoText:{fontSize: 9, marginBottom: 20, color:'gray', fontWeight: 500},

    // Button Styles //
    button: {
        width: 328,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#00459A',
        borderRadius: 10,
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 700,
        color: 'white',
    },
    buttonMasuk:{
        top: 50,
        left: 40,
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

    // Navigation //
    navigationBar: { flexDirection: 'row', justifyContent: 'center', height:70, marginBottom: '8%'},
    navigationIcon: {
        marginRight: 40, 
        marginLeft: 40, 
        marginTop: 15, 
        marginBottom: 5, 
        alignItems: 'center'
    },
    icon: {width: 25, height: 25},
    textIcon: {fontSize: 10, fontWeight: 500, color:'#00459A'}
});

export default HistoryScreen;
