import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

export const submitPatient = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.PATIENT.CREATE,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const success = { result };
      return success;
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
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

export const getAllPatients = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.GET_ALL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getStagiaire = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.STAGIAIRE.GET_ALL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getMedecin = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.MEDECIN.GET_ALL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getSecretaire = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.SECRETAIRE.GET_ALL);
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getCaissiere = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.CAISSIERE.GET_ALL);
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getInfirmiere = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.INFIRMIER.GET_ALL);
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getLaborantin = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.LABORANTIN.GET_ALL);
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const updatePatient = (patientId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.PATIENT.UPDATE(patientId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const createListePresence = (patientId) => {
  const dataToPost = { patient: patientId };
  const response = customFetch.post(
    API_URL.COMPUCLINIC.PATIENT.LISTE_PRESENCE,
    dataToPost,
  );
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getListePresence = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.LISTE_PRESENCE);
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getListeInternementEncours = () => {
  const response = customFetch.get(
    API_URL.COMPUCLINIC.PATIENT.LISTE_INTERNEMENT_EN_COURS,
  );
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getListeInternement = () => {
  const response = customFetch.get(
    API_URL.COMPUCLINIC.PATIENT.LISTE_INTERNEMENT,
  );
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
