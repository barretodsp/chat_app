import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Alert, Text, View, BackHandler } from 'react-native';
import AuthService from '../../services/AuthService';
import NavService from '../../services/NavService';
import { NavigationActions } from 'react-navigation';



function MedicalLogoutScreen() {

  function logout() {
    AuthService.medicalLogout();
    BackHandler.exitApp();
  }

  return (
    <Container>
      {
        Alert.alert(
          'Tem certeza de que deseja sair do app?',
          '',
          [
            { text: 'Cancelar', onPress: () => NavService.navigate('MedicalHomeScreen') },
            { text: 'SAIR', onPress: () => logout() },
          ],
          { cancelable: false }
        )}
    </Container>
  )
}
export default MedicalLogoutScreen;
