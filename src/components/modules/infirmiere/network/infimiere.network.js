import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

export const getAllPatients = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.GET_ALL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllParametres = () => {
  const response = customFetch.get(API_URL.CONSULTATION.PARAMETERS);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitDebutConsultation = (para) => {
  const response = customFetch.post(API_URL.CONSULTATION.GET_ALL, para);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getPatientsActiveTiaps = () => {
  const response = customFetch.get(API_URL.BONS.TIAPS_ACTIVE);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitParameters = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.BULK_PARAMETERS_exam,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
