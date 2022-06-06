import { Button, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaNotesMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import priseParametre2 from '../../../../assets/images/Infirmiere_homme.svg';
import priseParametre from '../../../../assets/images/prise_parametre.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import { InfirmiereBaseLayout } from '../components/infirmiereBaseLayout';
import { getAllPatients } from '../network/infimiere.network';

export const ListePatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
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
  return (
    <InfirmiereBaseLayout clicked={'patientList'}>
      <Table columns={columns} data={patients} isLoading={isLoading} />
    </InfirmiereBaseLayout>
  );
};

const actionFormatter = (cell, row) => {
  return (
    <Tooltip title='Prendre les parametres du patient'>
      <ButtonWithModal
        buttonText={<FaNotesMedical size={15} color='white' />}
        modalProps={{
          title: (
            <span style={{ color: 'white' }}>
              Débuter la prise des paramètres
            </span>
          ),
          width: 650,
        }}
        buttonProps={{ style: { backgroundColor: '#ff8619' } }}
      >
        {(closeModal) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img
              alt=''
              src={row.sexe === 'H' ? priseParametre2 : priseParametre}
              style={{ width: 350, height: 350 }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h5 style={{ marginBottom: 10, textAlign: 'center' }}>
                Commencer la prise des paramètres du patient
              </h5>
              <p style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>
                {row.nom} {row.prenom}
              </p>
              <Space style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                  to={{
                    pathname: '/infirmiere/dossier-medical',
                    state: row,
                  }}
                  onClick={() => closeModal()}
                >
                  <Button type='primary' style={{ width: 175 }}>
                    Dossier Médical
                  </Button>
                </Link>

                <Button
                  onClick={() => closeModal()}
                  danger
                  style={{ width: 175 }}
                >
                  Fermer
                </Button>
              </Space>
            </div>
          </div>
        )}
      </ButtonWithModal>
    </Tooltip>
  );
};

const columns = [
  {
    dataField: 'nom',
    text: 'Nom',
    sort: true,
  },

  {
    dataField: 'prenom',
    text: 'Prénom',
    sort: true,
  },
  {
    dataField: 'sexe',
    text: 'Sexe',
    sort: true,
  },
  {
    dataField: 'domicile',
    text: 'Adresse',
    sort: true,
  },
  {
    dataField: 'telephone',
    text: 'Téléphone',
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
  },
  {
    dataField: 'date_creation',
    text: "Date d'identification",
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
