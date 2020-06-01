import React, { Component } from 'react';
import { Image } from 'react-native';
import MedicalHomeScreen from '../screens/Medical/MedicalHomeScreen';
import MedicalUpdateScreen from '../screens/Medical/MedicalUpdateScreen';
import MedicalLogoutScreen from '../screens/Medical/MedicalLogoutScreen';

import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const MainNav = createStackNavigator({
//     MedicalHomeScreen: { screen: MedicalHomeScreen }
// }, {
//     initialRouteName: 'MedicalHomeScreen',
// });


const MedicalNav = createBottomTabNavigator({
  Logout: {
    screen: MedicalLogoutScreen,
    navigationOptions: {
      tabBarLabel: 'Logout',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/icons/account-arrow-left.png')} style={{ width: 22, height: 22, tintColor: tintColor }} resizeMode="contain" />
      )
    }
  },
  Home: {
    screen: MedicalHomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/icons/account-arrow-left.png')} style={{ width: 22, height: 22, tintColor: tintColor }} resizeMode="contain" />
      )
    }
  },
  Editar: {
    screen: MedicalUpdateScreen,
    navigationOptions: {
      tabBarLabel: 'Editar',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/icons/account-arrow-left.png')} style={{ width: 22, height: 22, tintColor: tintColor }} resizeMode="contain" />
      )
    }
  },
}, {
  initialRouteName: 'Home',
  lazy: true,
  tabBarOptions:{
    activeTintColor: '#1EB5C1',
  }
});

export default MedicalNav;