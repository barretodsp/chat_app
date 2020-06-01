import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Image, Text, View, BackHandler } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import PatientRegisterValidator from '../../validators/PatientRegisterValidator';
import AutoMessages from '../../components/AutoMessages';
import ChatHeader from '../../components/Headers/ChatHeader';

const ENDPOINT = "http://192.168.80.3:3000";

function PatientChatScreen() {
  const [type, setType] = useState(null);

  const [socket, initSocket] = useState(null);
  const [messages, setMessage] = useState([]);
  const [medicalOption, setMedicalOption] = useState(null);
  const [chatTitle, setChatTitle] = useState('Bem-Vindo!');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [crm, setCRM] = useState('');
  const [cpf, setCPF] = useState('');
  const [cep, setCEP] = useState('');
  const [specialism, setSpecialism] = useState('');
  const [msgType, setMsgType] = useState(900);
  const [CID, setCID] = useState(null);
  const [medSocketId, setMedSocket] = useState(null);


  useEffect(() => {
    let socket = SocketIOClient(ENDPOINT);
    initSocket(socket);
    console.log('Emitido EVENTO')
    socket.emit('hello_patient', 'RN TEST');
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('consultation_started', function (received) {
        setMessage(GiftedChat.append(messages, received.message));
        setCID(received.consultation_id);
        setMedSocket(received.medical_socket);
        setChatTitle(received.medical_name)
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
      socket.on('waiting_queue', function (message) {
        setMessage(GiftedChat.append(messages, message));
        setChatTitle('Aguardando Atendimento.')
        setMsgType(null);
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on('fill_email', function (message) {
        setMessage(GiftedChat.append(messages, message));
        setMsgType(1);
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on('fill_name', function (message) {
        setMessage(GiftedChat.append(messages, message));
        setMsgType(2);
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

  const handleEmail = (msg) => {
    try {
      let prm = msg[0].text
      let valid = PatientRegisterValidator.validateEmail(prm);
      if (valid) {
        setMessage(GiftedChat.append(messages, msg));
        setEmail(prm)
        socket.emit('patient_email', prm);
        setMsgType(0)
      } else {
        setMessage(GiftedChat.append(messages, [...AutoMessages.fillEmailCorrect(), ...msg]));
      }
    } catch (er) {
      console.log('ERRO - handleEmail:', er);
    }

  }

  const handleName = (msg) => {
    try {
      let prm = msg[0].text
      let valid = PatientRegisterValidator.validateName(prm);
      if (valid) {
        setName(prm);
        setMessage(GiftedChat.append(messages, [...AutoMessages.fillCpf(), ...msg]));
        setMsgType(3)
      } else {
        setMessage(GiftedChat.append(messages, [...AutoMessages.fillNameCorrect(), ...msg]));
      }
    } catch (er) {
      console.log('ERRO - handleName:', er);
    }

  }

  const handleCpf = (msg) => {
    let prm = msg[0].text
    let valid = PatientRegisterValidator.validateCpf(prm);
    if (valid) {
      setCPF(prm)
      setMessage(GiftedChat.append(messages, [...AutoMessages.fillCep(), ...msg]));
      setMsgType(4)
    } else {
      setMessage(GiftedChat.append(messages, [...AutoMessages.fillCpfCorrect(), ...msg]));
    }
  }

  const handleCep = (msg) => {
    let prm = msg[0].text
    let valid = PatientRegisterValidator.validateCep(prm);
    if (valid) {
      setCEP(prm)
      socket.emit('create_patient', { email, name, cpf, cep: prm });
      setMsgType(null)
    } else {
      setMessage(GiftedChat.append(messages, [...AutoMessages.fillCepCorrect(), ...msg]));
    }
  }

  const handleSendMessage = async (message) => {
    try {
      switch (msgType) {
        case 1:
          return handleEmail(message)
        case 2:
          return handleName(message)
        case 3:
          return handleCpf(message)
        case 4:
          return handleCep(message)
        default:
          setMessage(GiftedChat.append(messages, message));
          socket.emit('send_private_message', message);
      }
    } catch (er) {
      console.log('ERRO SEND MSG', er)
    }
  }

  const MedicalOptions = () => {
    return (
      <View>
        <Button block onPress={() => sendMessage()}>
          <Text >Cadastro</Text>
        </Button>
        <Button block onPress={() => setMedicalOption(2)}>
          <Text >Login</Text>
        </Button>
      </View>
    );
  }


  return (
    <Container>
      <ChatHeader title={chatTitle}/>
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSendMessage(newMessage)}
        user={{ _id: 20, name: 'User Test' }}
      />
    </Container>

  )
}
export default PatientChatScreen;
