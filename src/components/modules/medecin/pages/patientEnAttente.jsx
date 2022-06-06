/* eslint-disable no-unused-vars */
import { Button, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaStethoscope } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import priseParametre2 from '../../../../assets/images/Infirmiere_homme.svg';
import priseParametre from '../../../../assets/images/prise_parametre.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  dossierNameFormatter,
  medNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import { getCurrentConsultation } from '../network/medecin.network';

export const PatientEnAttente = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const connectedUser = useSelector((state) => state.userReducer).user;

  useEffect(() => {
    setIsLoading(true);
    getCurrentConsultation(connectedUser.id).then((data) => {
      console.log(connectedUser.id);
      if (data) {
        console.log(data);
        setPatients(data?.result);
        setIsLoading(false);
      } else {
        console.log(data);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <MedecinBaseLayout clicked={'patient'}>
      <Table columns={columns} data={patients} isLoading={isLoading} />
    </MedecinBaseLayout>
  );
};

const actionFormatter = (cell, row) => {
  return (
    <Tooltip title='Effectuer une consultation'>
      <ButtonWithModal
        buttonText={<FaStethoscope size={18} color='white' />}
        modalProps={{
          title: (
            <span style={{ color: 'white' }}>
              Débuter la consultation du patient
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
                Consulter le dossier du patient
              </h5>
              <p
                style={{
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                {row.dossier.nom} {row.dossier.prenom}
              </p>
              <Space style={{ display: 'flex', flexDirection: 'column' }}>
                {/* boutton permettre de commencer la consulation*/}
                <Link
                  to={{
                    pathname: '/medecin/consultations',
                    state: { consultation: row },
                  }}
                  onClick={() => closeModal()}
                >
                  <Button type='primary' style={{ width: 200 }}>
                    Commencer la consultation
                  </Button>
                </Link>

                <Link
                  to={{
                    pathname: '/medecin/dossier-medical',
                    state: { consultation: row },
                  }}
                  onClick={() => closeModal()}
                >
                  <Button type='primary' style={{ width: 200 }}>
                    Dossier Médical
                    {console.log('row id du patient ', row)}
                  </Button>
                </Link>

                <Button
                  onClick={() => closeModal()}
                  danger
                  style={{ width: 200 }}
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
    dataField: 'dossier.matricule',
    text: 'Matricule du Dossier',
    sort: true,
  },
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
    formatter: dossierNameFormatter,
  },
  {
    dataField: 'dossier.patient.sexe',
    text: 'Sexe',
    sort: true,
  },
  {
    dataField: 'dossier.patient.type',
    text: 'Type',
    sort: true,
  },

  {
    dataField: 'date_creation',
    text: 'Date de début Consultation',
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'action',
    text: 'Consultaion',
    formatter: actionFormatter,
  },
];
