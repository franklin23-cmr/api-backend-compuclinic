import { DateFrHr, DateFrHrWithTime } from '../DateToFrench';
export const dateFormatter = (cell, row) => {
  return <div>{DateFrHrWithTime(cell)} </div>;
};

export const dateFormatterNoTime = (cell, row) => {
  return <div>{DateFrHr(cell)} </div>;
};

export const patientNameFormatter = (cell, row) => {
  let patient =
    row?.patient || row?.quittance?.patient || row?.dossier.patient || row;
  return <span>{`${patient.nom} ${patient.prenom}`} </span>;
};

export const dossierNameFormatter = (cell, row) => {
  let patient = row?.dossier.patient || row;
  return <span>{`${patient.nom} ${patient.prenom}`} </span>;
};

export const medNameFormatter = (cell, row) => {
  let medecin = row?.medecin || row?.prestataire || row?.laborantin || row;
  return <span>{`${medecin.nom} ${medecin.prenom}`} </span>;
};

export const personnelNameFormatter = (cell, row) => {
  let personnel = row?.personnel || row?.directeur || row?.auteur;
  if (personnel) {
    return <span>{`${personnel.nom} ${personnel.prenom}`} </span>;
  } else {
    return '';
  }
};

export const caissierNameFormatter = (cell, row) => {
  let caissier = row?.caissier || row;
  return <span>{`${caissier.nom} ${caissier.prenom}`} </span>;
};

export const prestataireNameFormatter = (cell, row) => {
  let prestataire = row?.prestataire || row;
  return <span>{`${prestataire.nom} ${prestataire.prenom}`} </span>;
};
