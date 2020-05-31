import uuid from 'react-native-uuid';

const fillEmailCorrect = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'E-mail Inválido. Digite novamente.',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}

const fillCpf = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'Digite seu CPF',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}

const fillCpfCorrect = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'CPF Inválido. Digite novamente.',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}


const fillCep = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'Digite seu CEP',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}


const fillCepCorrect = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'CEP inválido! Digite novmanete.',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}

const fillName = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'Digite seu Name',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}

const fillNameCorrect = () => {
  return [
    {
      _id: uuid.v1(),
      text: 'Nome inválido! Digite novamente',
      createdAt: new Date(),
      user: { _id: 99, name: 'ChatBot', avatar: 'https://placeimg.com/140/140/any' },
    },
  ];
}




export default {
  fillEmailCorrect,
  fillCpf,
  fillCpfCorrect,
  fillCep,
  fillCepCorrect,
  fillName,
  fillNameCorrect
}