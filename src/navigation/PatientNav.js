import PatientChatScreen from '../screens/Patient/PatientChatScreen';

import { createStackNavigator } from 'react-navigation-stack';

const PatientNav = createStackNavigator({
    PatientChatScreen: { screen: PatientChatScreen }
}, {
    initialRouteName: 'PatientChatScreen',
});

export default PatientNav;