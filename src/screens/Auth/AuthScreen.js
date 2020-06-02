import React, { Component, useState, useEffect } from "react";
import MedicalService from "../../services/MedicalService";
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Item, Input, Button, Spinner } from 'native-base';
import styles from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthService from '../../services/AuthService';
import NavService from '../../services/NavService';
import Toast from 'react-native-simple-toast';

function AuthScreen() {
  const [type, setType] = useState(1);
  const [messages, setMessage] = useState([]);
  const [medicalOption, setMedicalOption] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('lala@gmail.com');
  const [pwd, setPwd] = useState('111111');
  const [crm, setCRM] = useState('');
  const [cpf, setCPF] = useState('');
  const [cep, setCEP] = useState('');
  const [specialism, setSpecialism] = useState('');
  const [msgType, setMsgType] = useState(900);


 async function signIn() {
   try{
     let resp = await AuthService.medicalLogin(email, pwd);
     console.log('Resp Login', resp);
     if(resp.status == 200)
       NavService.navigate('MedicalNav')
     else
      console.log('ERRO - AuthScreen', er);
   }catch(er){
      Toast.show('Login inválido.', Toast.LONG);
      console.log('ERRO - AuthScreen', er);
   }
  }

  const renderMedicalLogin = () => {
    if (type === 1) {
      return (
        <View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#B3B3B3' }}>Para realizar consultas, efetue o login abaixo.</Text>
          </View>
          <View style={{ marginTop: 20, marginBottom: 5 }}>
            <View style={styles.containerBtnForm}>
              <Button style={styles.btnLargeBlue} onPress={() => setType(2)}>
                <Text style={{ color: '#FFF' }}> LOGIN MÉDICO </Text>
              </Button>
            </View>
          </View>
          <View style={{ alignContent: 'center', alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => NavService.navigate('MedicalSignUp')}>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 14, color: '#B3B3B3' }}>É médico e ainda não possui conta?</Text>
                <Text style={{ fontSize: 14, color: '#808080', fontWeight: 'bold' }}> Cadastre-se? </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ marginTop: 20, marginBottom: 5 }}>
          <Item rounded inlineLabel style={styles.largeItemInput}>
            <Input placeholderTextColor="#B3B3B3"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              value={email}
              placeholder='E-mail'
              style={styles.largeInputText} />
          </Item>
          <Item rounded inlineLabel style={styles.largeItemInput}>
            <Input placeholderTextColor="#B3B3B3"
              onChangeText={(password) => setPwd(password)}
              value={pwd}
              secureTextEntry={true}
              placeholder='Senha'
              style={styles.largeInputText} />
          </Item>
          <View style={styles.containerBtnForm}>
            <Button style={[styles.btnLargeBlue, {marginBottom: 10}]} onPress={() => signIn()}>
              <Text style={{ color: '#FFF' }}> ENTRAR </Text>
            </Button>
            <Button style={styles.btnLargeBlue} onPress={() => setType(1)}>
              <Text style={{ color: '#FFF' }}> CANCELAR </Text>
            </Button>
          </View>
        </View>
      )
    }
  }

  return (
    <Container style={{ backgroundColor: '#FFF' }}>
      <Content style={styles.defaultContentContainer}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#B3B3B3' }}>BEM VINDO!</Text>
          </View>
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#B3B3B3' }}>Para ser atendido, clique no botão abaixo!</Text>
          </View>
        </View>
        <View style={{ marginTop: 20, marginBottom: 5 }}>
          <View style={styles.containerBtnForm}>
            <Button style={styles.btnLargeBlue} onPress={() => NavService.navigate('PatientChatScreen')}>
              <Text style={{ color: '#FFF' }}> SOU PACIENTE </Text>
            </Button>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 60, marginBottom: 5 }}>
            <View style={[styles.hr, { minWidth: 100, paddingLeft: 100 }]}></View>
            <Text style={{ fontSize: 14, top: -5 }}>ou</Text>
            <View style={[styles.hr, { minWidth: 100, paddingRight: 100 }]}></View>
          </View>
          {renderMedicalLogin()}
        </View>
      </Content>
    </Container>
  )
}
export default AuthScreen;


