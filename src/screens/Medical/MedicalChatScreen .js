import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Image, Text, View, BackHandler } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Session } from '../../session/Session';
import AutoMessages from '../../components/AutoMessages';
import ChatHeader from '../../components/Headers/ChatHeader';
const ENDPOINT = "http://192.168.80.3:3000";


function MedicalLogoutScreen(props) {
  const [type, setType] = useState(null);
  const [chatTitle, setChatTitle] = useState('Iniciando consulta...');
  const [socket, initSocket] = useState(null);
  const [messages, setMessage] = useState([]);
  const [CID, setCID] = useState(null);
  const [patId, setPatId] = useState(null);
  const [patSocketId, setPatSocket] = useState(null);
  const [patName, setPatName] = useState(null);

  useEffect(() => {
    console.log('MEDICAL CHAT - PROPS', props.navigation.state.patient);
    console.log('MEDICAL CHAT -  SESSION', Session.CurrentUser);
    if (props && props.navigation.state.patient) {
      let wpatient = props.navigation.state.patient;
      let socket = SocketIOClient(ENDPOINT);
      initSocket(socket);
      console.log('Emitido EVENTO')
      socket.emit('start_consultation', wpatient.key, Session.CurrentUser.medical_id, Session.CurrentUser.name);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('consultation_started', function (received) {
        setMessage(GiftedChat.append(messages, received.message));
        setCID(received.consultation_id);
        setPatSocket(received.patient_socket);
        setChatTitle(received.patient_name)
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
      socket.on('receive_private_message', function (message) {
        console.log('receive private msg', message);
        setMessage(GiftedChat.append(messages, message));
      });
    }
  });

  const handleSendMessage = async (message) => {
    try {
      socket.emit('send_private_message', message);
    } catch (er) {
      console.log('ERRO SEND MSG', er)
    }
  }

  return (
    <Container>
      <ChatHeader title={chatTitle} />
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSendMessage(newMessage)}
        user={{ _id: 20, name: 'User Test' }}
      />
    </Container>
  )
}
export default MedicalLogoutScreen;
