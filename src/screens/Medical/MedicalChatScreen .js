import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Image, Text, View, BackHandler } from 'react-native';

const ENDPOINT = "http://192.168.80.3:3000";


function MedicalLogoutScreen(props) {
  const [type, setType] = useState(null);
  const [socket, initSocket] = useState(null);
  const [patId, setPatId] = useState(null);
  const [patSocketId, setPatSocket] = useState(null);
  const [patName, setName] = useState(null);

  useEffect(async () => {
    let resp = await WaitingQueueService.getAll();
    if (resp.status == 200) {
      setPatients(resp.data);
      socket.emit('medical_choose_patient', );
    }
  }, []);

  useEffect(() => {
    let socket = SocketIOClient(ENDPOINT);
    initSocket(socket);
    console.log('Emitido EVENTO')
    socket.emit('hello_medical', 'RN TEST');
  }, []);


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
  <GiftedChat
    messages={messages}
    onSend={newMessage => handleSendMessage(newMessage)}
    user={{ _id: 20, name: 'User Test' }}
  />
)
}
export default MedicalLogoutScreen;
