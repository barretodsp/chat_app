import AuthScreen from '../screens/Auth/AuthScreen';

import { createStackNavigator } from 'react-navigation-stack';

const AuthNav = createStackNavigator({
    AuthScreen: { screen: AuthScreen }
}, {
    initialRouteName: 'AuthScreen',
});

export default AuthNav;