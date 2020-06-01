import RestService from './RestService';
import Validator from '../validators/MedicalValidator';


const create = (name, email, cpf, cep, address, crm, specialism, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = null;
      let valid = null
      valid = await Validator.setValidate({ name, email, cpf, cep, address, crm, specialism, password });
      if (valid.error)
        return resolve(valid)

      resp = await RestService.call('medical', 'add', { name, email, password, crm, cpf, cep, specialism, address })
      if (resp.status == 200)
        return resolve({ success: true })
      else if (resp.status == 400)
        return reject({ error: 'CPF ou E-mail inválido para cadastro.' })
      else
        return reject({ error: 'Houve um erro ao realizar essa operação.' })
    } catch (er) {
      return reject({ error: 'Houve um erro ao realizar essa operação.' })
    }
  });
};


const get = (medical_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = null;
      resp = await RestService.call('medical', 'get', { medical_id })
      return resolve(resp);
    } catch (er) {
      return reject({ error: 'Houve um erro ao obter seus dados. Tente novamente.' })
    }
  });
};

export default {
  create,
  get
}