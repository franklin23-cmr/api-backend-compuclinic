import * as yup from 'yup';

export const PatientInterneValidation = yup.object().shape({
  CNI: yup.string().required(),
  adresse_garant: yup.string().required(),
  date_naissance: yup.string().required(),
  domicile: yup.string().required(),
  lieu_naissance: yup.string().required(),
  lieu_travail: yup.string().required(),
  lieu_travail_garant: yup.string().required(),
  nationalite: yup.string().required(),
  nom: yup.string().required(),
  nom_garant: yup.string().required(),
  prenom: yup.string().required(),
  prenom_garant: yup.string().required(),
  profession: yup.string().required(),
  profession_garant: yup.string().required(),
  sexe: yup.string().required(),
  telephone: yup.string().required(),
  telephone_garant: yup.string().required(),
  telephone_lieu_travail_patient: yup.string(),
});
