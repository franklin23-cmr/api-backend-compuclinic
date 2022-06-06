import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

export const submitLaborantin = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.LABORANTIN.CREATE,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const success = { success: true };
      return success;
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
};

export const submitStagiaire = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.STAGIAIRE.CREATE,
    dataToPost,
  );
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

export const submitStage = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.STAGIAIRE.CREATE_STAGE,
    dataToPost,
  );
  return response
    .then(async (result) => {
      return { success: true };
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
};

export const submitInfirmier = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.INFIRMIER.CREATE,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const success = { success: true };
      return success;
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
};

export const submitCaissiere = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.CAISSIERE.CREATE,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const success = { success: true };
      return success;
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
};

export const submitMedecin = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.MEDECIN.CREATE,
    dataToPost,
  );
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

export const submitProfilSpecialiste = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.MEDECIN.CREATE_PROFIL,
    dataToPost,
  );
  return response
    .then(async (result) => {
      return { success: true };
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
};

export const submitSecretaire = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.COMPUCLINIC.SECRETAIRE.CREATE,
    dataToPost,
  );
  return response
    .then(async (result) => {
      const success = { success: true };
      return success;
    })
    .catch((e) => {
      console.log(e);
      const success = { success: false };
      return success;
    });
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

export const getStagiaire = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.STAGIAIRE.GET_ALL);
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

export const getPersonnel = () => {
  const response = customFetch.get(API_URL.COMPUCLINIC.PERSONNEL.GET_ALL);
  return response.then(async (result) => {
    const data = { result };
    return data;
  });
};

export const updatePersonnel = (personnelId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.PERSONNEL.UPDATE(personnelId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const submitPlanning = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.RESSOURSE_HUMAINE.PERIODES,
    dataToPost,
  );
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

export const getGroups = () => {
  const response = customFetch.get(API_URL.UTILISATEUR.GET_GROUPS);
  return response.then(async (result) => {
    const data = { result };
    return data;
  });
};

export const submitProfil = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.UTILISATEUR.CREATE_PROFIL,
    dataToPost,
  );
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

export const updateProfil = async (profilId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.UTILISATEUR.UPDATE_PROFIL(profilId),
    dataToPost,
  );
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

export const updatePassword = async (userId, dataToPost) => {
  const response = customFetch.post(
    API_URL.UTILISATEUR.UPDATE_PASSWORD(userId),
    dataToPost,
  );
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

export const updateSecretaire = (personnelId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.SECRETAIRE.UPDATE(personnelId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};
export const updateMedecin = (medecinId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.MEDECIN.UPDATE(medecinId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const updateCaissier = (personnelId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.CAISSIERE.UPDATE(personnelId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const updateInfirmier = (personnelId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.INFIRMIER.UPDATE(personnelId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const updateLaborantin = (personnelId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.LABORANTIN.UPDATE(personnelId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const updateStagiaire = (personnelId, dataToPost) => {
  const response = customFetch.patch(
    API_URL.COMPUCLINIC.STAGIAIRE.UPDATE(personnelId),
    dataToPost,
  );
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getProfilSpecialiste = (id) => {
  const response = customFetch.get(
    API_URL.COMPUCLINIC.MEDECIN.GET_PROFIL_SPECIAL(id),
  );
  return response
    .then((result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};
