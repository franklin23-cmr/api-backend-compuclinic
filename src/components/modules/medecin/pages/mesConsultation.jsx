/* eslint-disable no-unused-vars */
import { Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  dossierNameFormatter,
  medNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { ConsultationDetail } from '../components/consultationDetails';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import { getMedecinConsultation } from '../network/medecin.network';

export const MesConsultation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const connectedUser = useSelector((state) => state.userReducer).user;

  useEffect(() => {
    setIsLoading(true);
    getMedecinConsultation(connectedUser.id).then((data) => {
      if (data.result) {
        setConsultations(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <MedecinBaseLayout clicked='consult'>
      <Table
        columns={columns}
        data={consultations}
        isLoading={isLoading}
        onSelect={(row, rowIndex) => setIsLoading(row)}
      />
    </MedecinBaseLayout>
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
          width: 650,
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
    text: 'Dossier',
    sort: true,
  },
  {
    dataField: 'dossier.patient.nom',
    text: 'Patient',
    formatter: dossierNameFormatter,
    sort: true,
  },
  {
    dataField: 'en_cours',
    text: 'En cours',
    sort: true,
  },
  {
    dataField: 'medecin.nom',
    text: 'Medecin',
    sort: true,
    formatter: medNameFormatter,
  },
  {
    dataField: 'date_creation',
    text: 'Date de Début',
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
