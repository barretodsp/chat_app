import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import AuthNav from './AuthNav';
import MedicalNav from './MedicalNav';
import PatientNav from './PatientNav';

const BaseNavigator = createSwitchNavigator(
	{
		AuthNav,	
		MedicalNav,
		PatientNav
	},
	{
		initialRouteName: 'AuthNav',
		
	}
)
export const AppContainer = createAppContainer(BaseNavigator)