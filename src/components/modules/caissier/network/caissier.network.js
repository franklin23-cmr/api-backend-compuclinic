import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

export const getAllPatients = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.ATTENTE);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllQuittances = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.QUITTANCE);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const internerPatient = async (patientId) => {
  const response = customFetch.get(
    API_URL.COMPUCLINIC.PATIENT.INTERNER(patientId),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const libererPatient = async (patientId) => {
  const response = customFetch.get(
    API_URL.COMPUCLINIC.PATIENT.LIBERER(patientId),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAGVs = async () => {
  const response = customFetch.get(API_URL.BONS.AGV);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getBGSs = async () => {
  const response = customFetch.get(API_URL.BONS.BGS);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getBSCs = async () => {
  const response = customFetch.get(API_URL.BONS.BSC);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getTIAPSs = async () => {
  const response = customFetch.get(API_URL.BONS.TIAPS);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitQuittance = (quittance) => {
  const response = customFetch.post(API_URL.BONS.QUITTANCE, quittance);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getPeriodes = () => {
  const response = customFetch.get(API_URL.RESSOURSE_HUMAINE.PERIODES);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitTiaps = (tiaps) => {
  const response = customFetch.post(API_URL.BONS.TIAPS, tiaps);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
