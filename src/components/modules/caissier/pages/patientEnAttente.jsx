import { Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import { CaissierBaseLayout } from '../components/caissierBaseLayout';
import { QuittanceForm } from '../components/quittanceForm';
import { getAllPatients } from '../network/caissier.network';

export const PatientEnAttente = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getAllPatients().then((data) => {
      console.log(data);
      if (data) {
        setPatients(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const actionFormatter = (cell, row) => {
    return !row.a_paye ? (
      <Space>
        <Tooltip title='payer la quittance'>
          <ButtonWithModal
            buttonText={<FaMoneyBill size={18} color='white' />}
            modalProps={{
              title: <span style={{ color: 'white' }}>Payer la Quittance</span>,
            }}
            buttonProps={{ style: { backgroundColor: '#ff8619' } }}
          >
            {(closeModal) => (
              <QuittanceForm closeModal={closeModal} patient={row.patient} />
            )}
          </ButtonWithModal>
        </Tooltip>
      </Space>
    ) : (
      <div></div>
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
      text: "Date d'arrivée",
      sort: true,
      formatter: dateFormatter,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];
  return (
    <CaissierBaseLayout clicked={'patient'}>
      <Table columns={columns} data={patients} isLoading={isLoading} />
    </CaissierBaseLayout>
  );
};
