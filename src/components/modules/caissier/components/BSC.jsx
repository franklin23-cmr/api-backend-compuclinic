import { useEffect, useState } from 'react';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  medNameFormatter,
  patientNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { getBSCs } from '../network/caissier.network';

export const BSC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bscs, setBSCs] = useState([]);

  useEffect(() => {
    getBSCs().then((data) => {
      setBSCs(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table isLoading={isLoading} data={bscs} columns={columns} />
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
  {
    dataField: 'raison_credit',
    text: 'Raison du Crédit',
    sort: true,
  },
  {
    dataField: 'garantie',
    text: 'Garantie',
    sort: true,
  },
];
