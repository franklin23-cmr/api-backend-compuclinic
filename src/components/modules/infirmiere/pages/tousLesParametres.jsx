/* eslint-disable no-unused-vars */
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  medNameFormatter,
  patientNameFormatter,
  personnelNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { getAllConsultations } from '../../medecin/network/medecin.network';
import { InfirmiereBaseLayout } from '../components/infirmiereBaseLayout';
import { getAllParametres } from '../network/infimiere.network';

export const TousLesParametres = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [parametres, setParametres] = useState([]);
  const [consultations, setConsultation] = useState([]);

  useEffect(() => {
    getAllConsultations().then((data) => {
      if (data.result) {
        setConsultation(data?.result);
        getAllParametres().then((data) => {
          if (data.result) {
            setParametres(data?.result);
            setIsLoading(false);
          }
        });
      }
    });
  }, []);

  const actionFormatter = (cell, row) => {
    return (
      <Tooltip title='Détails de la prise des paramètres'>
        <ButtonWithModal
          buttonText={<FaClipboardList size={18} color='white' />}
          modalProps={{
            title: (
              <span style={{ color: 'white' }}>
                Paramètres de la consultation
              </span>
            ),
            width: 900,
          }}
          buttonProps={{ style: { backgroundColor: '#ff8619' } }}
        >
          {(closeModal) => (
            <Table
              columns={columnsParametre}
              data={parametres.filter((item) => item.consultation === row.id)}
              isLoading={isLoading}
              hidePagination={true}
              hideSearchBar={true}
            />
          )}
        </ButtonWithModal>
      </Tooltip>
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
      dataField: 'dossier.patient.nom',
      text: 'Patient',
      sort: true,
      formatter: patientNameFormatter,
    },
    {
      dataField: 'service.nom',
      text: 'Service',
      sort: true,
    },
    {
      dataField: 'en_cours',
      text: 'Etat',
      sort: true,
    },
    {
      dataField: 'date_creation',
      text: 'Date de Début de consultation',
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
    <InfirmiereBaseLayout clicked='listeparam'>
      <Table columns={columns} data={consultations} isLoading={isLoading} />
    </InfirmiereBaseLayout>
  );
};

const columnsParametre = [
  {
    dataField: 'type',
    text: 'Type de Paramètre',
    sort: true,
  },
  {
    dataField: 'valeur',
    text: 'Valeur',
    sort: true,
  },
  {
    dataField: 'commentaire',
    text: 'Commentaire',
    sort: true,
  },
  {
    dataField: 'auteur.nom',
    text: 'Infirmière',
    formatter: personnelNameFormatter,
    sort: true,
  },
  {
    dataField: 'date_prise',
    text: 'Date de Prise',
    sort: true,
    formatter: dateFormatter,
  },
];
