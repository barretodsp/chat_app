import React, { useState, useEffect } from 'react';
import styles from '../../assets/styles/globalStyles';
import { Alert, Image, Text, View } from "react-native";
import { Button, Icon } from "native-base";
import NavService from '../../services/NavService';
import { NavigationActions } from 'react-navigation';

function ChatHeader(props) {
  const { header, simpleHeaderRow, simpleHeaderTitle, backIcon } = styles;
  const [title, setTitle] = useState('');
  console.log('PROPS em HEADER', props)

  useEffect(() => {
    setTitle(props.title)
  }, [props.title]);

  const exit = () => {
    Alert.alert(
      'Tem certeza de que deseja sair?',
      'Esta ação suspenderá o atendimento.',
      [
        { text: 'Cancelar', onPress: () => console.log('exit') },
        { text: 'SAIR', onPress: () => props.exit() },
      ],
      { cancelable: false }
    )
  }

  const Title = () => {
    return (
      <View style={simpleHeaderRow}>
        <Button transparent onPress={() => exit()}>
          <Image source={require('../../assets/icons/account-arrow-left.png')}
            style={{ marginLeft: 20, width: 22, height: 22, tintColor: '#FFF' }} resizeMode="contain" />
        </Button>
        <Text uppercase={false} style={simpleHeaderTitle}>{title}</Text>
      </View>
    )
  }

  return (
    <View style={header}>
      {Title()}
    </View>
  )
}

export default ChatHeader;