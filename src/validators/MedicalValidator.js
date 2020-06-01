import cpf from 'cpf';

const success = { success: true }

const setValidate = async (medical) => {
  try {
    resp = await validateFilled(medical.name)
    if (!resp) return { error: 'Nome inválido.' }

    resp = await validateEmail(medical.email)
    if (!resp) return { error: 'E-mail inválido.' }

    resp = await validatePwd(medical.password)
    if (!resp) return { error: 'Senha inválida. Mínimo de 6 caracteres.' }

    resp = await validateCpf(medical.cpf)
    if (!resp) return { error: 'CPF inválido.' }

    resp = await validateCep(medical.cep)
    if (!resp) return { error: 'CEP inválido.' }

    resp = await validateFilled(medical.address)
    if (!resp) return { error: 'Endereço inválido.' }

    resp = await validateFilled(medical.crm)
    if (!resp) return { error: 'CRM inválido.' }

    resp = await validateFilled(medical.specialism)
    if (!resp) return { error: 'Especialidade inválida.' }

    resp = await validatePwd(medical.password)
    if (!resp) return { error: 'Senha inválida. Mínimo de 6 caracteres.' }

    return success;

  } catch (er) {
    console.log('Erro MedicalValidator', er);
    return { error: 'Erro' }
  }

}


const validateEmail = (email) => {
  if (email && !(/^\s*$/.test(email)) &&
    (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.trim())
  ) return true
  return false
}

const validateFilled = (prm) => {
  if (prm && !(/^\s*$/.test(prm))) return true
  return false
}

const validateCpf = (CPF) => {
  return cpf.isValid(CPF)
}

const validateCep = (cep) => {
  if (cep && (/\d{8}/g).test(cep)) return true
  return false
}

const validatePwd = (pwd) => {
  if (pwd && (/\d{6}/g).test(pwd)) return true
  return false
}


export default {
  setValidate
}