import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Alert, Image, Text, View, BackHandler } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Session } from '../../session/Session';
import ChatHeader from '../../components/Headers/ChatHeader';
import NavService from '../../services/NavService';
const ENDPOINT = "http://192.168.80.3:3000";


function MedicalLogoutScreen(props) {
  const [chatTitle, setChatTitle] = useState('Iniciando consulta...');
  const [socket, initSocket] = useState(null);
  const [messages, setMessage] = useState([]);
  const [CID, setCID] = useState(null);
  const [patId, setPatId] = useState(null);
  const [patSocketId, setPatSocket] = useState(null);

  useEffect(() => {
    console.log('MEDICAL CHAT - PROPS', props.navigation.state.params);
    console.log('MEDICAL CHAT -  SESSION', Session.CurrentUser);
    if (props && props.navigation.state.params.patient) {
      let wpatient = props.navigation.state.params.patient;
      let socket = SocketIOClient(ENDPOINT);
      initSocket(socket);
      console.log('Emitido EVENTO')
      socket.emit('start_consultation', wpatient.key, Session.CurrentUser.medical_id, Session.CurrentUser.name);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('backPress', () => {
      Alert.alert(
        'Tem certeza de que deseja sair?',
        'Esta ação suspenderá o atendimento.',
        [
          { text: 'Cancelar', onPress: () => console.log('exit') },
          { text: 'SAIR', onPress: () => exitChat() },
        ],
        { cancelable: false }
      )
    });
    // Clean BackHandler Observer
    return function cleanup() {
      BackHandler.removeEventListener('backPress');
    };
  });

  useEffect(() => {
    if (socket) {
      socket.on('consultation_started', function (received) {
        setMessage(GiftedChat.append(messages, received.message));
        setCID(received.consultation_id);
        setPatId(received.patient_id);
        setPatSocket(received.patient_socket);
        setChatTitle(received.patient_name);
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on('patient_exit', function (message) {
        alert(message[0].text);
        setCID(null);
        setPatId(null);
        setPatSocket(null);
        socket.disconnect();
        NavService.navigate('MedicalHomeScreen');
      });
    }
  });


  useEffect(() => {
    if (socket) {
      socket.on('unavailable_server', function (message) {
        alert('Tratar Unavaiable Servewr')
        console.log('TRATAR unavailable_server', message)
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on('receive_consultation_message', function (message) {
        console.log('receive_consultation_message', message);
        setMessage(GiftedChat.append(messages, message));
      });
    }
  });



  const handleSendMessage = async (message) => {
    try {
      setMessage(GiftedChat.append(messages, message));
      socket.emit('send_consultation_message', patSocketId, patId, CID, message);
    } catch (er) {
      console.log('ERRO SEND MSG', er)
    }
  }

  const exitChat = () => {
    try {
      socket.disconnect();
      NavService.navigate('MedicalHomeScreen');
    } catch (er) {
      NavService.navigate('MedicalHomeScreen');
    }
  }



  return (
    <Container>
      <ChatHeader exit={exitChat.bind(this)} title={chatTitle} />
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSendMessage(newMessage)}
        user={{ _id: Session.CurrentUser.medical_id, name: Session.CurrentUser.name }}
      />
    </Container>
  )
}
export default MedicalLogoutScreen;
