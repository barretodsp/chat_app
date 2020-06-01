
import cpf from 'cpf';

const validateEmail = (email) => {
  if (email && !(/^\s*$/.test(email)) &&
    (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.trim())
  ) return true
  return false
}

const validateName = (name) => {
  if (name && !(/^\s*$/.test(name))) return true
  return false
}

const validateCpf = (CPF) => {
  return cpf.isValid(CPF)
}

const validateCep = (cep) => {
  if (cep && (/\d{8}/g).test(cep)) return true
  return false
}


export default {
  validateEmail,
  validateCep,
  validateCpf,
  validateName
}