import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Ganti 'RootStackParamList' dengan nama tipe navigator kamu
type RootStackParamList = {
  Akun: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Akun'>;
};

const ContactScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titlePage}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Akun')}>
            <Image style={styles.imageHeader} source={require('../../assets/arrow_back.png')} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Hubungi Kami</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.textSection}>
          Untuk kebutuhan SOS ataupun komplain dapat menghubungi kami di:
        </Text>

        <TouchableOpacity style={styles.containerChoise}>
          <Image style={styles.iconChoise} source={require('../../assets/whatsApp.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>+62 85803994936</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerChoise}>
          <Image style={styles.iconChoise} source={require('../../assets/call-outline_main.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>+62 85803994936</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerChoise}>
          <Image style={styles.iconChoise} source={require('../../assets/mail_icon.png')} />
          <View style={styles.containerText}>
            <Text style={styles.headerChoise}>fahririzkis1004@gmail.com</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  // Header Section
  titlePage: { height: 80, elevation: 5, backgroundColor: 'white', justifyContent: 'center' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 30 },
  imageHeader: { width: 24, height: 24 },
  textHeader: { marginLeft: 10, fontSize: 14, fontWeight: '700' },

  // Content
  scrollContent: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 40 },
  textSection: { fontSize: 13, fontWeight: '400', marginBottom: 20 },

  containerChoise: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    padding: 15,
    marginBottom: 15,
  },
  iconChoise: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 15,
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
  },
  headerChoise: {
    fontSize: 14,
    fontWeight: '500',
  },
});
