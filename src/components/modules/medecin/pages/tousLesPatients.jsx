import { Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaCcMastercard } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import { AvgForm } from '../components/avgForm';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import { getAllPatients } from '../network/medecin.network';

export const TousLesPatients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const connectedUser = useSelector((state) => state.userReducer).user;

  useEffect(() => {
    setIsLoading(true);
    getAllPatients().then((data) => {
      if (data) {
        setPatients(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const actionFormatter = (cell, row) => {
    return (
      <Space>
        <Tooltip title='Accorder un AGV'>
          <ButtonWithModal
            buttonText={<FaCcMastercard size={15} color='white' />}
            modalProps={{
              title: <span style={{ color: 'white' }}>Accorder un AGV</span>,
              width: 650,
            }}
            buttonProps={{ style: { backgroundColor: '#ff8619' } }}
          >
            {(closeModal) => (
              <AvgForm
                closeModal={closeModal}
                patient={row.patient}
                prestataire={{
                  nom: `${connectedUser.nom} ${connectedUser.prenom}`,
                  id: connectedUser.id,
                }}
              />
            )}
          </ButtonWithModal>
        </Tooltip>
      </Space>
    ); /* : (
      <div></div>
    ); */
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
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];
  return (
    <MedecinBaseLayout clicked={'allpatient'}>
      <Table
        columns={columns}
        data={patients}
        isLoading={isLoading}
        //onSelect={(row, rowIndex) => setIsLoading(row)}
      />
    </MedecinBaseLayout>
  );
};
