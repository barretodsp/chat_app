import React, { useState, useEffect } from 'react';
import styles from '../../assets/styles/globalStyles';
import { Image, Text, View } from "react-native";
import { Button, Icon } from "native-base";
import NavService from '../../services/NavService';
import { NavigationActions } from 'react-navigation';

function SimpleHeader(props) {
  const { header, simpleHeaderRow, simpleHeaderTitle, backIcon } = styles;
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(props.title)
  }, [props.title]);

  const Title = () => {
    return (
      <View style={simpleHeaderRow}>
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

export default SimpleHeader;