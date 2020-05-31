
import React, {Fragment} from 'react';
import NavService from './src/services/NavService'
import { AppContainer } from './src/navigation/AppContainer';


const App = () => {
  	return(<AppContainer ref={navigatorRef => { NavService.setTopLevelNavigator(navigatorRef) }} />	)
};


export default App;
