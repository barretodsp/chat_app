import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import AuthNav from './AuthNav';
import MedicalNav from './MedicalNav';
import PatientNav from './PatientNav';
// import CompleteRegisterScreen from '../components/Authentication/CompleteRegisterScreen';
// import AuthLoading from '../components/Authentication/AuthLoading';
// import AuthTermsModal from '../components/Authentication/AuthTermsModal';
// import AuthWelcomeModal from '../components/Authentication/AuthWelcomeModal';
// import AuthFirstPharmModal from '../components/Authentication/AuthFirstPharmModal';

const BaseNavigator = createSwitchNavigator(
	{
		AuthNav,	
		MedicalNav,
		PatientNav
	},
	{
		initialRouteName: 'AuthNav'
	}
)
export const AppContainer = createAppContainer(BaseNavigator)