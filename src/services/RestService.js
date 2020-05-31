const call = async (modelName, serviceName, paramObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = null;
      let resp2json = null;
      let status = null;
      console.log('CHEGUEI em REST-call');
      resp = await fetch(`http://192.168.80.3:3000/api/v1/${modelName}/${serviceName}`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Content-Type': 'application/json'
          // 'Authorization': Session.AuthToken
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
      // resp = await fetch(`https://servicesapi.medilist.com.br:3000/api/v1/auth/login`, {
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

export default {
  call,
  pwdLogin
}