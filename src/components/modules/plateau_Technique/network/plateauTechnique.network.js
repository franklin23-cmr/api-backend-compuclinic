import { API_URL } from '../../../shared/API_URLS';
import { customFetch } from '../../../shared/customFetch';

//fonctions pour obtenir la liste des infrastructures
export const getInfrastructures = async () => {
  const response = customFetch.get(API_URL.PLATEAU_TECHNIQUE.INFRASTRUCTURE);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//fonctions pour obtenir la liste des batiments
export const getBatiements = async () => {
  const response = customFetch.get(API_URL.PLATEAU_TECHNIQUE.BATIMENT);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//fonctions pour obtenir la liste des locaux
export const getLocaux = async () => {
  const response = customFetch.get(API_URL.PLATEAU_TECHNIQUE.LOCAL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//fonctions pour obtenir la liste des lits
export const getLits = async () => {
  const response = customFetch.get(API_URL.PLATEAU_TECHNIQUE.LIT);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//fonctions pour obtenir la liste des MATERIEL
export const getMateriel = async () => {
  const response = customFetch.get(API_URL.PLATEAU_TECHNIQUE.MATERIEL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//fonctions pour obtenir la liste des Services
export const getServices = async () => {
  const response = customFetch.get(API_URL.PLATEAU_TECHNIQUE.SERVICES);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

export const getPersonnel = async () => {
  const response = customFetch.get(API_URL.PERSONNEL.PERSONNEL);
  return response
    .then(async (result) => {
      const data = { result };
      return data;
    })
    .catch((e) => console.log(e));
};

//gestion des formulaires d'enregistrement

export const submitInfrastructure = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.PLATEAU_TECHNIQUE.INFRASTRUCTURE,
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

export const updateInfrastructure = (dataToPost, infrasId) => {
  const response = customFetch.patch(
    API_URL.PLATEAU_TECHNIQUE.UPDATE_INFRASTRUCTURE(infrasId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const submitLit = async (dataToPost) => {
  const response = customFetch.post(API_URL.PLATEAU_TECHNIQUE.LIT, dataToPost);
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

export const updateLit = (dataToPost, litId) => {
  const response = customFetch.patch(
    API_URL.PLATEAU_TECHNIQUE.UPDATE_LIT(litId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const submitLocal = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.PLATEAU_TECHNIQUE.LOCAL,
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

export const updateLocal = (dataToPost, litId) => {
  const response = customFetch.patch(
    API_URL.PLATEAU_TECHNIQUE.UPDATE_LOCAL(litId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const submitBatiment = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.PLATEAU_TECHNIQUE.BATIMENT,
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

export const updateBatiment = (dataToPost, litId) => {
  const response = customFetch.patch(
    API_URL.PLATEAU_TECHNIQUE.UPDATE_BATIMENT(litId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const submitMateriel = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.PLATEAU_TECHNIQUE.MATERIEL,
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

export const updateMateriel = (dataToPost, materielId) => {
  const response = customFetch.patch(
    API_URL.PLATEAU_TECHNIQUE.UPDATE_MATERIEL(materielId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const submitService = async (dataToPost) => {
  const response = customFetch.post(
    API_URL.PLATEAU_TECHNIQUE.SERVICES,
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

export const updateService = (dataToPost, litId) => {
  const response = customFetch.patch(
    API_URL.PLATEAU_TECHNIQUE.UPDATE_SERVICES(litId),
    dataToPost,
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const getInfrastructureFiltre = (value) => {
  const response = customFetch.get(
    API_URL.PLATEAU_TECHNIQUE.LISTE_INFRASTRUCTURE_FILTRE(value),
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const getInfrastructureServices = (value) => {
  const response = customFetch.get(
    API_URL.PLATEAU_TECHNIQUE.LISTE_INFRASTRUCTURE_SERVICES(value),
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const getServiceFiltre = (value) => {
  const response = customFetch.get(
    API_URL.PLATEAU_TECHNIQUE.LISTE_SERVICES_FILTRE(value),
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const getInfrastructurePersonnel = (infrasId) => {
  const response = customFetch.get(
    API_URL.PLATEAU_TECHNIQUE.LISTE_PERSONNEL_INFRASTRUCTURE(infrasId),
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};

export const getInfrastructureLit = (infrasId) => {
  const response = customFetch.get(
    API_URL.PLATEAU_TECHNIQUE.LISTE_PLATEAU_COUNT(infrasId),
  );
  return response.then(async (result) => {
    const data = result;
    return data;
  });
};
