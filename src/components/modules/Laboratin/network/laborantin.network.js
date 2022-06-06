import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

//recupere les consultation en cours d'un médecin
export const getCurrentExamen = (ID) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_EXAMEN_LABORANTIN(ID),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllPrescription = () => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_EXAMEN_PRESCRITION(),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getLaborantin = (Id) => {
  const response = customFetch.get(API_URL.COMPUCLINIC.LABORANTIN.GET_ONE(Id));
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const updateListePrescrition = (Id, dataPatch) => {
  const response = customFetch.update(
    API_URL.CONSULTATION.UPDATE_LISTE_EXAMEN_PRESCRITION(Id),
    dataPatch,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const updateListeExamen_ATTENTE = (dataPatch) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.ADD_EXAMEN_EN_ATTENTE(),
    dataPatch,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const updateListeExamen_ATTENTE_AFTER = (dataPatch) => {
  const response = customFetch.put(
    API_URL.CONSULTATION.ADD_EXAMEN_EN_ATTENTE(),
    dataPatch,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getListeParametres = async (Idconsul) => {
  const response = customFetch.get(API_URL.CONSULTATION.LISTE_PARA(Idconsul));
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
export const getSingleInfoSomebody = async (idprescription) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.SINGLE_EXAMEN_SOMEONE(idprescription),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
export const getListeParametres_exam = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_PARA_EXAM(Idconsul),
  );
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

export const submitParameters_exam = (dataToPost) => {
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
