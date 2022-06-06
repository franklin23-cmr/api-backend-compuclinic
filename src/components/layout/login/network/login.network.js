import Cryptr from 'cryptr';
import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

export const submitLoginForm = (dataToPost) => {
  const response = customFetch.post(API_URL.COMPUCLINIC.LOGIN, dataToPost);

  return response
    .then(async (result) => {
      return { result };
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
};

export const getProfil = () => {
  const cryptr = new Cryptr('aybrCoDA1hNLW8kTIdcVQX6reqe4bHqk');
  const accessToken = localStorage.getItem('access-token');
  const decrypted = cryptr.decrypt(accessToken);
  const response = customFetch.getWithToken(
    API_URL.UTILISATEUR.GET_PROFIL,
    decrypted,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
