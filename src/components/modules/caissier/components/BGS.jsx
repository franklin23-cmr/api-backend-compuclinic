import { useEffect, useState } from 'react';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  medNameFormatter,
  patientNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { getBGSs } from '../network/caissier.network';

export const BGS = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bgss, setBgss] = useState([]);

  useEffect(() => {
    getBGSs().then((data) => {
      setBgss(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table isLoading={isLoading} data={bgss} columns={columns} />
    </div>
  );
};

const columns = [
  {
    dataField: 'prestataire.nom',
    text: 'Prestataire',
    sort: true,
    formatter: medNameFormatter,
  },
  {
    dataField: 'patient',
    text: 'Patient',
    sort: true,
    formatter: patientNameFormatter,
  },
  {
    dataField: 'prestation',
    text: 'Prestation',
    sort: true,
  },
  {
    dataField: 'date_limite_validite',
    text: 'Date limite de validité',
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'est_consommee',
    text: 'Est consommée',
    sort: true,
  },
];
