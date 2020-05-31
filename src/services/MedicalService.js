import RestService from './RestService';

const create = (name, email, password, crm, cpf, cep, specialism) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = null;
            let valid = null;
            let patientDecor = null;
            resp = await RestService.call('medical', 'add', {name, email, password, crm, cpf, cep, specialism} )
            console.log('RESP EM PATIENT-SERVICE', resp); 
            alert('RESP MEDICAL CREATE', resp);
            resolve(resp);
        } catch (er) {
            reject(`[ERROR] PatientService.create => ${er}`);
        }
    });
};

const getByEmail = (param) => {
  console('GETBYEMAIL - HEHEHEE')
}

export default {
  create,
  getByEmail
}