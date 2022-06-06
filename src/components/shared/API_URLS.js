//const BASE_URL = 'http://167.71.64.104:8000/api/';
const BASE_URL = 'http://127.0.0.1:8000/api/';
// const BASE_URL = 'http://e0e3-41-202-207-10.ngrok.io/api/';
const SECRETARIAT_BASE_URL = `${BASE_URL}secretariat-api/`;
const CAISSE_BASE_URL = `${BASE_URL}caisse-api/`;
const CONSULTATION_BASE_URL = `${BASE_URL}consultation-api/`;
const GRH_BASE_URL = `${BASE_URL}grh-api/`;
const PLATEAU_BASE_URL = `${BASE_URL}plateau-technique-api/`;
// const PLATEAU_TECHNIQUE_BASE_URL = `${BASE_URL}plateau-technique-api/`;
const UTILISATEUR_BASE_URL = `${BASE_URL}utilisateur-api/`;

export const API_URL = {
  AUTH: {
    GET_TOKEN: `${BASE_URL}token/`,
    REFRESH_TOKEN: `${BASE_URL}token/refresh/`,
  },
  COMPUCLINIC: {
    LOGIN: `${BASE_URL}token/`,
    SECRETAIRE: {
      GET_ALL: `${GRH_BASE_URL}secretaires/`,
      GET_ONE: (id) => `${GRH_BASE_URL}secretaires/${id}/`,
      UPDATE: (id) => `${GRH_BASE_URL}secretaires/${id}/`,
      CREATE: `${GRH_BASE_URL}secretaires/`,
    },
    PERSONNEL: {
      GET_ALL: `${GRH_BASE_URL}personnels/`,
      GET_ONE: (id) => `${GRH_BASE_URL}personnels/${id}/`,
      UPDATE: (id) => `${GRH_BASE_URL}personnels/${id}/`,
      CREATE: `${GRH_BASE_URL}personnels/`,
    },
    PATIENT: {
      CREATE: `${SECRETARIAT_BASE_URL}patients/`,
      UPDATE: (id) => `${SECRETARIAT_BASE_URL}patients/${id}/`,
      GET_ALL: `${SECRETARIAT_BASE_URL}patients/`,
      GET_ONE: (id) => `${SECRETARIAT_BASE_URL}patients/${id}/`,
      INTERNER: (id) =>
        `${SECRETARIAT_BASE_URL}patients/${id}/interner-patient/`,
      LIBERER: (id) =>
        `${SECRETARIAT_BASE_URL}patients/${id}/externer-patient/`,
      QUITTANCE: `${CAISSE_BASE_URL}quittances/`,
      LISTE_PRESENCE: `${SECRETARIAT_BASE_URL}liste-presence/`,
      LISTE_INTERNEMENT: `${SECRETARIAT_BASE_URL}internements/`,
      LISTE_INTERNEMENT_EN_COURS: `${SECRETARIAT_BASE_URL}internements/?en_cours=True`,
      ATTENTE: `${SECRETARIAT_BASE_URL}liste-presence/`,
      /* 
      LISTE_CONSUL: (parametres_pris = 'True') =>
        `${SECRETARIAT_BASE_URL}liste-presence?parametres_pris=${parametres_pris}`,*/
      //LISTE_CONSUL: `${SECRETARIAT_BASE_URL}liste-presence/?parametres_pris=false`,
    },
    MEDECIN: {
      GET_ALL: `${GRH_BASE_URL}medecins/`,
      GET_ONE: (id) => `${GRH_BASE_URL}medecins/${id}/`,
      CREATE: `${GRH_BASE_URL}medecins/`,
      CREATE_PROFIL: `${GRH_BASE_URL}profils-specialiste/`,
      UPDATE: (id) => `${GRH_BASE_URL}medecins/${id}/`,
      GET_PROFIL_SPECIAL: (id) => `${GRH_BASE_URL}profils-specialiste/${id}/`,
    },
    CAISSIERE: {
      GET_ALL: `${GRH_BASE_URL}caissiers/`,
      GET_ONE: (id) => `${GRH_BASE_URL}caissiers/${id}/`,
      CREATE: `${GRH_BASE_URL}caissiers/`,
      ATTENTE: `${CAISSE_BASE_URL}patientAttente/`,
      UPDATE: (id) => `${GRH_BASE_URL}caissiers/${id}/`,
    },
    INFIRMIER: {
      GET_ALL: `${GRH_BASE_URL}infirmiers/`,
      GET_ONE: (id) => `${GRH_BASE_URL}infirmiers/${id}/`,
      UPDATE: (id) => `${GRH_BASE_URL}infirmiers/${id}/`,
      CREATE: `${GRH_BASE_URL}infirmiers/`,
    },
    STAGIAIRE: {
      GET_ALL: `${GRH_BASE_URL}stagiaires/`,
      GET_ONE: (id) => `${GRH_BASE_URL}stagiaires/${id}/`,
      CREATE: `${GRH_BASE_URL}stagiaires/`,
      CREATE_STAGE: `${GRH_BASE_URL}stages/`,
      UPDATE: (id) => `${GRH_BASE_URL}stagiaires/${id}/`,
    },
    PLANNING: {
      GET_ALL: `${GRH_BASE_URL}periodes/`,
      GET_ONE: (id) => `${GRH_BASE_URL}periodes/${id}/`,
      UPDATE: (id) => `${GRH_BASE_URL}periodes/${id}/`,
      CREATE: `${GRH_BASE_URL}periodes/`,
    },
    LABORANTIN: {
      GET_ALL: `${GRH_BASE_URL}laborantins/`,
      GET_ONE: (id) => `${GRH_BASE_URL}laborantins/${id}/`,
      CREATE: `${GRH_BASE_URL}laborantins/`,
      UPDATE: (id) => `${GRH_BASE_URL}laborantins/${id}/`,
    },
  },
  BONS: {
    AGV: `${CAISSE_BASE_URL}AGVs/`,
    BGS: `${CAISSE_BASE_URL}BGSs/`,
    BSC: `${CAISSE_BASE_URL}BSCs/`,
    TIAPS: `${CAISSE_BASE_URL}TIAPSs/`,
    TIAPS_ACTIVE: `${CAISSE_BASE_URL}TIAPSs/?est_utilise=False&type=QUITTANCE`,
    LISTE_CONSUL: (id) =>
      `${CAISSE_BASE_URL}TIAPSs/?medecin=${id}&est_utilise=True&type=QUITTANCE`,
    QUITTANCE: `${CAISSE_BASE_URL}quittances/`,
    QUITTANCE_TO_PAID: (id) => `${CAISSE_BASE_URL}quittances/${id}/`,
  },
  CONSULTATION: {
    GET_ALL: `${CONSULTATION_BASE_URL}consultations/`,
    MY_CONSUL: (id) => `${CONSULTATION_BASE_URL}consultations/`,
    FICHE_CONSUL: (id) =>
      `${CONSULTATION_BASE_URL}consultations/?dossier=${id}`,
    PARAMETERS: `${CONSULTATION_BASE_URL}parametres/`,
    BULK_PARAMETERS: `${CONSULTATION_BASE_URL}parametres-bulk/`,
    BULK_PARAMETERS_exam: `${CONSULTATION_BASE_URL}BulletinExamen/`,
    SYMPTOMES: `${CONSULTATION_BASE_URL}symptomes/`,
    BULK_SYMPTOMES: `${CONSULTATION_BASE_URL}symptomes-bulk/`,
    DIAGNOTIC: `${CONSULTATION_BASE_URL}differentiels/`,
    BULK_DIAGNOTIC: `${CONSULTATION_BASE_URL}differentiels-bulk/`,
    RECOMMANDATIONS: `${CONSULTATION_BASE_URL}recommandations/`,
    BULK_RECOMMANDATIONS: `${CONSULTATION_BASE_URL}recommadations-bulk/`,
    MEDICAMENTS: `${CONSULTATION_BASE_URL}prescriptions-medicament/`,
    BULK_MEDICAMENTS: `${CONSULTATION_BASE_URL}prescription-medicament-bulk/`,
    EXAMENS: `${CONSULTATION_BASE_URL}prescriptions-examen/`,

    BULK_EXAMENS: `${CONSULTATION_BASE_URL}prescription-examen-bulk/`,

    END_CONSULTATION: (id) =>
      `${CONSULTATION_BASE_URL}consultations/${id}/fermer/`,

    LISTE_PARA: (id) =>
      `${CONSULTATION_BASE_URL}parametres/?consultation=${id}`,
    LISTE_PARA_EXAM: (id) =>
      `${CONSULTATION_BASE_URL}BulletinExamen/?id=&date_prelevement=&resultat=&laborantin=${id}`,
    LISTE_SYMP: (id) => `${CONSULTATION_BASE_URL}symptomes/?consultation=${id}`,
    LISTE_DIFFERENTIEL: (id) =>
      `${CONSULTATION_BASE_URL}differentiels/?consultation=${id}`,
    LISTE_RECOMMANDATION: (id) =>
      `${CONSULTATION_BASE_URL}recommandations/?consultation=${id}`,
    LISTE_MEDICAMENT: (id) =>
      `${CONSULTATION_BASE_URL}prescriptions-medicament/?consultation=${id}`,
    LISTE_EXAMEN: (id) =>
      `${CONSULTATION_BASE_URL}prescriptions-examen/?consultation=${id}`,
    SINGLE_EXAMEN_SOMEONE: (id) =>
      `${CONSULTATION_BASE_URL}prescriptions-examen/?est_fait=true&consultation=&type=&label=&description=&id=${id}`,
    LISTE_EXAMEN_LABORANTIN: (id) =>
      `${CONSULTATION_BASE_URL}examens/?est_fait=false&laborantin=${id}`,
    FILE_ATTENTE: (id) =>
      `${CONSULTATION_BASE_URL}consultations/?en_cours=true&medecin=${id}`,
    SINGLE_EXAMEN: (id, label) =>
      `${CONSULTATION_BASE_URL}prescriptions-examen/?est_fait=true&consultation=${id}&type=&label=${label}&description=`,
    SINGLE_EXAMEN_COVID: (id, label) =>
      `${CONSULTATION_BASE_URL}BulletinExamen/?id=&date_prelevement=&resultat=&laborantin=&consultation=${id}&prescription=${label}`,
    MES_CONSULTATIONS: (id) =>
      `${CONSULTATION_BASE_URL}consultations/?medecin=${id}`,
    LISTE_EXAMEN_PRESCRITION: () =>
      `${CONSULTATION_BASE_URL}prescriptions-examen/?est_fait=false`,
    UPDATE_LISTE_EXAMEN_PRESCRITION: (id) =>
      `${CONSULTATION_BASE_URL}prescriptions-examen/${id}/`,
    ADD_EXAMEN_EN_ATTENTE: () => `${CONSULTATION_BASE_URL}examens/`,
  },
  PERSONNEL: {
    PERSONNEL: `${GRH_BASE_URL}personnels/`,
  },
  PLATEAU_TECHNIQUE: {
    LIT: `${PLATEAU_BASE_URL}lits/`,
    UPDATE_LIT: (id) => `${PLATEAU_BASE_URL}lits/${id}/`,

    MATERIEL: `${PLATEAU_BASE_URL}materiels/`,
    UPDATE_MATERIEL: (id) => `${PLATEAU_BASE_URL}materiels/${id}`,

    INFRASTRUCTURE: `${PLATEAU_BASE_URL}infrastructures/`,
    UPDATE_INFRASTRUCTURE: (id) => `${PLATEAU_BASE_URL}infrastructures/${id}/`,

    LOCAL: `${PLATEAU_BASE_URL}locaux/`,
    UPDATE_LOCAL: (id) => `${PLATEAU_BASE_URL}locaux/${id}/`,

    BATIMENT: `${PLATEAU_BASE_URL}batiments/`,
    UPDATE_BATIMENT: (id) => `${PLATEAU_BASE_URL}batiment/${id}/`,

    SERVICES: `${PLATEAU_BASE_URL}services/`,
    UPDATE_SERVICES: (id) => `${PLATEAU_BASE_URL}services/${id}/`,

    LISTE_PERSONNEL_INFRASTRUCTURE: (id) =>
      `${PLATEAU_BASE_URL}personnels-infrastructures/?infrastructure=${id}`,
    LISTE_INFRASTRUCTURE_FILTRE: (value) =>
      `${PLATEAU_BASE_URL}infrastructures/?search=${value}`,
    LISTE_INFRASTRUCTURE_SERVICES: (id) =>
      `${PLATEAU_BASE_URL}infrastructures/${id}/services/`,
    LISTE_PLATEAU_COUNT: (id) =>
      `${PLATEAU_BASE_URL}infrastructures/${id}/composants/count/`,
    LISTE_SERVICES_FILTRE: (value) =>
      `${PLATEAU_BASE_URL}services/?search=${value}`,
  },
  RESSOURSE_HUMAINE: {
    PERIODES: `${GRH_BASE_URL}periodes/`,
  },

  UTILISATEUR: {
    GET_PROFIL: `${UTILISATEUR_BASE_URL}profil/`,
    CREATE_PROFIL: `${UTILISATEUR_BASE_URL}utilisateurs/`,
    UPDATE_PROFIL: (profilId) =>
      `${UTILISATEUR_BASE_URL}utilisateurs/${profilId}/`,
    UPDATE_PASSWORD: (userId) =>
      `${UTILISATEUR_BASE_URL}utilisateurs/${userId}/update_password`,
    GET_GROUPS: `${UTILISATEUR_BASE_URL}groupes/`,
  },
};
