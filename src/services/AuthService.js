import RestService from './RestService';
import { Session } from '../session/Session';

const medicalLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = null;
            resp = await RestService.call('auth', 'loginMedical', { email, password })
            if (resp.status === 200) {
                Session.setAuthToken(resp.token);
                Session.setCurrentUser(resp.medical);
                console.log('RESP EM AUTH TOKEN', resp.token);
            }
            resolve(resp);
        } catch (er) {
            reject(`[ERROR] AuthService.medicalLogin => ${er}`);
        }
    });
}

const medicalLogout = () => {
    Session.setAuthToken(null);
    Session.setCurrentUser({});
}


export default {
    medicalLogin,
    medicalLogout
}