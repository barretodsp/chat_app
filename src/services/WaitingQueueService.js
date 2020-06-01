import RestService from './RestService';

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = null;
      resp = await RestService.call('waitingQueue', 'getAll', {})
      console.log('RESP EM WAITING-SERVICE', resp);
      resolve(resp);
    } catch (er) {
      reject(`[ERROR] WaitingQueueService.getAll => ${er}`);
    }
  });
};


export default {
  getAll
}