import AuthScreen from '../screens/Auth/AuthScreen';
import MedicalSignUp from '../screens/Auth/MedicalSignUpScreen';


import { createStackNavigator } from 'react-navigation-stack';

const AuthNav = createStackNavigator({
    AuthScreen: { screen: AuthScreen },
    MedicalSignUp: { screen: MedicalSignUp}
}, {
    initialRouteName: 'AuthScreen',
    headerMode: 'none'
});

export default AuthNav;