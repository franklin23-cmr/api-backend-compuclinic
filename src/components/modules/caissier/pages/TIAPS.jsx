import { useEffect, useState } from 'react';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  dateFormatterNoTime,
  medNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { CaissierBaseLayout } from '../components/caissierBaseLayout';
import { getTIAPSs } from '../network/caissier.network';

export const TIAPS = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tiaps, setTiaps] = useState([]);

  useEffect(() => {
    getTIAPSs().then((data) => {
      setTiaps(data?.result);
      setIsLoading(false);
      console.log('>>>>>>>>>>>>>>>>>', data);
    });
  }, []);

  return (
    <CaissierBaseLayout clicked='tiaps'>
      <Table isLoading={isLoading} data={tiaps} columns={columns} />
    </CaissierBaseLayout>
  );
};

const columns = [
  {
    dataField: 'medecin.nom',
    text: 'Médecin',
    sort: true,
    formatter: medNameFormatter,
  },
  {
    dataField: 'quittance.numero',
    text: 'Numéro Quittance',
    sort: true,
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
  },
  {
    dataField: 'date_creation',
    text: "Date d'Activation",
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'date_consultation',
    text: 'Date de Consultation',
    sort: true,
    formatter: dateFormatterNoTime,
  },
  {
    dataField: 'heure_debut',
    text: 'Heure de début',
    sort: true,
  },
  {
    dataField: 'heure_fin',
    text: 'Heure de fin',
    sort: true,
  },
];
