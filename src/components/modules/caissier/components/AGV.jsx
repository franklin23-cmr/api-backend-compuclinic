import { useEffect, useState } from 'react';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  medNameFormatter,
  patientNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { getAGVs } from '../network/caissier.network';

export const AGV = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agvs, setAgvs] = useState([]);

  useEffect(() => {
    getAGVs().then((data) => {
      setAgvs(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table isLoading={isLoading} data={agvs} columns={columns} />
    </div>
  );
};

const columns = [
  {
    dataField: 'prestataire',
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
