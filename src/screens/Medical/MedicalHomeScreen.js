import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Image, Text, View, BackHandler } from 'react-native';


function MedicalHome() {
  const [type, setType] = useState(null);
  return (
    <View>
      <Text>
        MedicalHomeScreen
      </Text>
    </View>
  )
}
export default MedicalHome;
