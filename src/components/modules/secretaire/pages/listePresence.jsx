/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';
import { getListePresence } from '../network/secretaire.network';

export const ListePresence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getListePresence().then((data) => {
      if (data) {
        setPatients(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <SecretaireBaseLayout clicked='listPresence'>
      <Table
        columns={columns}
        data={patients}
        isLoading={isLoading}
        onSelect={(row, rowIndex) => setIsLoading(row)}
      />
    </SecretaireBaseLayout>
  );
};

const columns = [
  {
    dataField: 'patient.nom',
    text: 'Nom',
    sort: true,
  },

  {
    dataField: 'patient.prenom',
    text: 'Prénom',
    sort: true,
  },
  {
    dataField: 'patient.sexe',
    text: 'Sexe',
    sort: true,
  },
  {
    dataField: 'patient.domicile',
    text: 'Adresse',
    sort: true,
  },
  {
    dataField: 'patient.telephone',
    text: 'Téléphone',
  },
  {
    dataField: 'patient.type',
    text: 'Type',
    sort: true,
  },
  {
    dataField: 'date_creation',
    text: "Date d'arrivé",
    sort: true,
    formatter: dateFormatter,
  },
];
