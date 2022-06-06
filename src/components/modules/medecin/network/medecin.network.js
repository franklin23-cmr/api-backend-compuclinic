import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

export const getAllPatients = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.LISTE_PRESENCE);
  return response
    .then(async (result) => {
      const data = { result };
      console.log(data);
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllConsultations = () => {
  const response = customFetch.get(API_URL.CONSULTATION.GET_ALL);
  return response
    .then(async (result) => {
      const data = { result };
      console.log(data);
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitParameters_exeam = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.LISTE_PARA_EXAM,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getListeConsultations = async (dossierId) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.FICHE_CONSUL(dossierId),
  );
  return response
    .then(async (result) => {
      const data = { result };
      console.log(data);
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

export const getAllParam = async (Idconsul) => {
  const response = customFetch.get(API_URL.CONSULTATION.LISTE_PARA(Idconsul));
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllSymp = async (Idconsul) => {
  const response = customFetch.get(API_URL.CONSULTATION.LISTE_SYMP(Idconsul));
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
export const getAllMed = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_MEDICAMENT(Idconsul),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
export const getAllExam = async (Idconsul) => {
  const response = customFetch.get(API_URL.CONSULTATION.LISTE_EXAMEN(Idconsul));
  return response
    .then(async (result) => {
      const data = { result };
      console.log(data);
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllRecom = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_RECOMMANDATION(Idconsul),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllDiag = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_DIFFERENTIEL(Idconsul),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllDifferentiel = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_DIFFERENTIEL(Idconsul),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllRecommandation = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_RECOMMANDATION(Idconsul),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllMedicamment = async (Idconsul) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.LISTE_MEDICAMENT(Idconsul),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getAllExamens = async (Idconsul) => {
  const response = customFetch.get(API_URL.CONSULTATION.LISTE_EXAMEN(Idconsul));
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//recupere les consultation en cours d'un médecin
export const getCurrentConsultation = (medecinId) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.FILE_ATTENTE(medecinId),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getCurrentSingleExamen = (consultationId, label) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.SINGLE_EXAMEN(consultationId, label),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getCurrentSingleBulletinExamen = (
  consultationId,
  idprescription,
) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.SINGLE_EXAMEN_COVID(consultationId, idprescription),
  );
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
//recupere toutes les consultation d'un médecin
export const getMedecinConsultation = (medecinId) => {
  const response = customFetch.get(
    API_URL.CONSULTATION.MES_CONSULTATIONS(medecinId),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitAvg = (avg) => {
  const response = customFetch.post(API_URL.BONS.AGV, avg);
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

// mettre la route correspondante
export const getPatient = async () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PATIENT.ATTENTE);
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

export const getMedecin = (medecinId) => {
  const response = customFetch.get(
    API_URL.COMPUCLINIC.MEDECIN.GET_ONE(medecinId),
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitSymptomes = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.BULK_SYMPTOMES,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitDifferentiels = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.BULK_DIAGNOTIC,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitRecommandations = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.BULK_RECOMMANDATIONS,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitMedicaments = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.BULK_MEDICAMENTS,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const submitExamens = (dataToPost) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.BULK_EXAMENS,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

// pay for the examination prescription at the cash desk

export const submitExamenToCashier = (id, dataToPost) => {
  const response = customFetch.put(
    API_URL.BONS.QUITTANCE_TO_PAID(id),
    dataToPost,
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) =>
      console.log(
        e,
        '------------------> error to save quittance <---------------------',
      ),
    );
};

export const endConsultation = async (consultationId) => {
  const response = customFetch.post(
    API_URL.CONSULTATION.END_CONSULTATION(consultationId),
    {},
  );
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
