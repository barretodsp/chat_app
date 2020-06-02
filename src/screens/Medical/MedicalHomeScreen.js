import React, { useState, useEffect } from "react";
import styles from '../../assets/styles/globalStyles';
import { Container, Text, Card, CardItem } from 'native-base';
import { Alert, FlatList, View, BackHandler } from 'react-native';
import WaitingQueueService from '../../services/WaitingQueueService';
import NavService from '../../services/NavService';
import AuthService from '../../services/AuthService';
import SimpleHeader from '../../components/Headers/SimpleHeader ';


function MedicalHomeScreen() {
  const [patients, setPatients] = useState([]);

  useEffect(async () => {
    let resp = await WaitingQueueService.getAll();
    console.log('resp espera', resp);
    if (resp.status == 200) {
      setPatients(resp.data);
    }
  }, []);

  const logout = () => {
    AuthService.medicalLogout();
    BackHandler.exitApp();
  }

  useEffect(() => {
    BackHandler.addEventListener('backPress', () => {
      Alert.alert(
        'Tem certeza de que deseja sair do app?',
        '',
        [
          { text: 'Cancelar', onPress: () => console.log('exit') },
          { text: 'SAIR', onPress: () => logout },
        ],
        { cancelable: false }
      )
    });
    // Clean BackHandler Observer
    return function cleanup() {
      BackHandler.removeEventListener('backPress');
    };
  });

  const choosePatient = (patient) => {
    console.log('PACIENTE ESCOLHIDO', patient);
    NavService.navigate('MedicalChatScreen', { patient })
  }

  const renderItem = (item) => {
    try {
      return (
        <View>
          <Card style={styles.card}>
            <CardItem style={styles.cardItem} button onPress={() => choosePatient(item)}>
              <View style={styles.cardInfos}>
                <Text style={styles.defaultText}> {item.patient_name} </Text>
              </View>
            </CardItem>
          </Card>
        </View>
      )
    } catch (er) {
      console.log('ERRO', er)
    }
  }

  const RenderContent = () => {
    if (patients.length > 0) {
      return (
        <FlatList
          data={patients}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => { item.key }}
          onEndReached={() => console.log('...')}
        />
      )
    } else {
      return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#B3B3B3' }}>BEM VINDO!</Text>
          </View>
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#B3B3B3' }}>No momento, a fila de espera de pacientes está vazia! </Text>
          </View>
        </View>
      )
    }
  }

  return (
    <Container>
      <SimpleHeader title='Pacientes em Espera'  />
      {RenderContent()}
    </Container>
  )
}
export default MedicalHomeScreen;
