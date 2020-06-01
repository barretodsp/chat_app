import React, { useState, useEffect } from "react";
import styles from '../../assets/styles/globalStyles';
import { Container, Content, Form, Item, Text, Button, Spinner, Card, CardItem } from 'native-base';
import { Image, FlatList, View, BackHandler } from 'react-native';
import WaitingQueueService from '../../services/WaitingQueueService';
import NavService from '../../services/NavService';


function MedicalHomeScreen() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setLoading] = useState(false);


  useEffect(async () => {
    let resp = await WaitingQueueService.getAll();
    if (resp.status == 200){
      setPatients(resp.data);
    }
  }, []);

  const choosePatient = (patient) => {
    console.log('PACIENTE ESCOLHIDO', patient);
    NavService.navigate('MedicalChatScreen', {patient})
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
      console.log('EROO 111', er)
    }
  }

  return (
    <FlatList
      data={patients}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={item => { item.key }}
      onEndReached={() => console.log('OPA?')}
    />

  )
}
export default MedicalHomeScreen;
