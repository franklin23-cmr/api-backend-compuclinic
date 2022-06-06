/* eslint-disable no-unused-vars */
import { Button, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  dossierNameFormatter,
  medNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { getListeConsultations } from '../network/medecin.network';
import { ConsultationDetail } from './consultationDetails';

export const ListeConsultation = ({ consultation }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [liste, setPatients] = useState([]);
  const { dossier } = consultation;

  useEffect(() => {
    getListeConsultations(dossier.id).then((data) => {
      if (data?.result) {
        setPatients(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Table
        isLoading={isLoading}
        data={liste}
        columns={columns}
        hidePagination={true}
      />
      <Space>
        <Button
          type='primary'
          onClick={() =>
            history.push('/medecin/consultations', {
              consultation,
            })
          }
        >
          Débuter la consultation
        </Button>
      </Space>
    </div>
  );
};

const actionFormatter = (cell, row) => {
  return (
    <Tooltip title='Details de la consultation'>
      <ButtonWithModal
        buttonText={<FaClipboardList size={18} color='white' />}
        modalProps={{
          title: (
            <span style={{ color: 'white' }}>Détails de la consultation</span>
          ),
          width: 600,
        }}
        buttonProps={{ style: { backgroundColor: '#0047FF' } }}
      >
        {(closeModal) => (
          <ConsultationDetail consultation={row} closeModal={closeModal} />
        )}
      </ButtonWithModal>
    </Tooltip>
  );
};

const columns = [
  {
    dataField: 'dossier.matricule',
    text: 'Matricule du Dossier',
    sort: true,
  },
  {
    dataField: 'dossier.patient.nom',
    text: 'Patient',
    formatter: dossierNameFormatter,
  },
  {
    dataField: 'medecin.nom',
    text: 'Medecin',
    formatter: medNameFormatter,
  },
  {
    dataField: 'date_creation',
    text: 'Date de début de Consultation',
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'en_cours',
    text: 'En cours',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
