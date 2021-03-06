import { Session } from '../session/Session';

const call = async (modelName, serviceName, paramObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = null;
      let resp2json = null;
      let status = null;
      console.log('CHEGUEI em REST-call');
      resp = await fetch(`http://192.168.80.3:3000/api/v1/${modelName}/${serviceName}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': Session.AuthToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paramObject)
      })
      status = resp.status;
      console.log('REST-API: call', resp);
      resp2json = await resp.json();
      resp2json.status = status;
      resolve(resp2json);
    } catch (er) {
      reject(`[ERROR] RestService.call => ${er}`);
    }
  });
}

const pwdLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = null;
      let resp2json = null;
      let status = null;
      let paramObject = {}
      paramObject = { email, password }
      resp = await fetch(`http://192.168.1.106:3000/api/v1/auth/loginMedical`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramObject)
      })
      console.log('RESP PWD LOGIN', resp);
      status = resp.status;
      if (status == 200) {
        resp2json = await resp.json();
        resp2json.status = status;
        resolve({ success: { data: resp2json } });
      } else {
        resolve({ error: 'Login Inválido' })
      }
    } catch (er) {
      reject(`[ERROR] RestService.pwdLogin => ${er}`);
    }
  });
}

const getAddress = async (cep) => {
  try {
    resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (resp.status == 200) {
      let rc = await resp.json();
      console.log('RC', rc)
      if (!rc.erro) {
        return `${rc.logradouro}, ${rc.bairro}, ${rc.localidade}, ${rc.uf}`
      } else {
        return null
      }
    } else {
      return null;
    }
  } catch (er) {
    console.log('ERRROR GET ADDRESS', er);
    return;
  }
}

export default {
  call,
  pwdLogin,
  getAddress
}