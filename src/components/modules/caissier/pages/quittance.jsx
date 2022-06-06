/* eslint-disable no-unused-vars */
import { Button, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaLaptopMedical, FaMinus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  caissierNameFormatter,
  dateFormatter,
  patientNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { CaissierBaseLayout } from '../components/caissierBaseLayout';
import { getAllQuittances } from '../network/caissier.network';

export const Quittance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getAllQuittances().then((data) => {
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
        {!row.est_consommee ? (
          <Tooltip title='Activer le TIAPS'>
            <ButtonWithModal
              buttonText={<FaLaptopMedical size={18} color='white' />}
              modalProps={{
                title: (
                  <span style={{ color: 'white' }}>
                    Ticket Informatisé d'Accès au Prestation de Soins
                  </span>
                ),
              }}
              buttonProps={{ style: { backgroundColor: '#ff8619' } }}
            >
              {(closeModal) => (
                <div>
                  <p>
                    Voulez vous activer le TIAPS et accorder un médecin au
                    Patient?
                  </p>
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type='primary'
                      onClick={() => {
                        history.push('/caissier/activate-tiaps', row);
                        closeModal();
                      }}
                    >
                      Oui
                    </Button>
                    <Button onClick={() => closeModal()} type='primary' danger>
                      Non
                    </Button>
                  </Space>
                </div>
              )}
            </ButtonWithModal>
          </Tooltip>
        ) : (
          <Tooltip title='Le tiaps est déjà activé'>
            <Button disabled>
              <FaMinus size={20} color='#f44336' />
            </Button>
          </Tooltip>
        )}
      </Space>
    );
  };

  const columns = [
    {
      dataField: 'numero',
      text: 'Numéro',
      sort: true,
    },
    {
      dataField: 'patient.nom',
      text: 'Patient',
      formatter: patientNameFormatter,
    },
    {
      dataField: 'prestation',
      text: 'Prestation',
      sort: true,
    },
    /* 
    {
      dataField: 'rubrique',
      text: 'Rubrique',
      sort: true,
    }, */
    {
      dataField: 'montant_TTC',
      text: 'Montant_TTC',
      sort: true,
    },
    {
      dataField: 'date_creation',
      text: 'Date Paiement',
      formatter: dateFormatter,
    },
    {
      dataField: 'caissier.nom',
      text: 'Caissier',
      formatter: caissierNameFormatter,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];
  return (
    <CaissierBaseLayout clicked={'quittance'}>
      <Table columns={columns} data={patients} isLoading={isLoading} />
    </CaissierBaseLayout>
  );
};
