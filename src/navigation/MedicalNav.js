import MedicalHomeScreen from '../screens/Medical/MedicalHomeScreen';

import { createStackNavigator } from 'react-navigation-stack';

const MedicalNav = createStackNavigator({
    MedicalHomeScreen: { screen: MedicalHomeScreen }
}, {
    initialRouteName: 'MedicalHomeScreen',
});

export default MedicalNav;