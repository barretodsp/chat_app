import React, { useState, useEffect } from "react";
import { Container, Button } from 'native-base';
import { Alert, Text, View, BackHandler } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import PatientRegisterValidator from '../../validators/PatientRegisterValidator';
import AutoMessages from '../../components/AutoMessages';
import ChatHeader from '../../components/Headers/ChatHeader';
import { Session } from '../../session/Session';
import RestService from '../../services/RestService';
import NavService from "../../services/NavService";

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
  //incluir api
  const [cep, setCEP] = useState('');
  const [specialism, setSpecialism] = useState('');
  const [msgType, setMsgType] = useState(900);
  const [CID, setCID] = useState(null);
  const [medSocketId, setMedSocket] = useState(null);
  const [medId, setMed] = useState(null);


  useEffect(() => {
    let socket = SocketIOClient(ENDPOINT);
    initSocket(socket);
    socket.emit('hello_patient', 'RN TEST');
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('consultation_started', function (received) {
        setMessage(GiftedChat.append(messages, received.message));
        setCID(received.consultation_id);
        setMed(received.medical_id);
        setMedSocket(received.medical_socket);
        setChatTitle(received.medical_name)
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on('medical_exit', function (message) {
        alert(message[0].text);
        setCID(null);
        setMed(null);
        setMedSocket(null);
        socket.disconnect();
        NavService.navigate('AuthScreen');
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
      socket.on('waiting_queue', function (receive) {
        console.log('RECEIVE waitin queue', receive)
        setMessage(GiftedChat.append(messages, receive.message));
        Session.setCurrentUser(receive.patient)
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
      socket.on('receive_consultation_message', function (message) {
        console.log('receive_consultation_message', message);
        setMessage(GiftedChat.append(messages, message));
      });
    }
  });

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

  const exitChat = () => {
    try {
      socket.disconnect();
      NavService.navigate('AuthScreen');
    } catch (er) {
      NavService.navigate('AuthScreen');
    }
  }

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

  const handleCep = async (msg) => {
    let prm = msg[0].text
    let valid = PatientRegisterValidator.validateCep(prm);
    let address = await RestService.getAddress(prm)
    if (valid && address) {
      setCEP(prm)
      socket.emit('create_patient', { email, name, cpf, cep: prm, address });
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
          socket.emit('send_consultation_message', medSocketId, medId, CID, message);
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
      <ChatHeader exit={exitChat.bind(this)} title={chatTitle} />
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSendMessage(newMessage)}
        user={{ _id: Session.CurrentUser.patient_id, name: Session.CurrentUser.name }}
      />
    </Container>

  )
}
export default PatientChatScreen;
