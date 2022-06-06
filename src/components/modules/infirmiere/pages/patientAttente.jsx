import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaNotesMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import priseParametre2 from '../../../../assets/images/Infirmiere_homme.svg';
import priseParametre from '../../../../assets/images/prise_parametre.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  medNameFormatter,
  patientNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { InfirmiereBaseLayout } from '../components/infirmiereBaseLayout';
import { getPatientsActiveTiaps } from '../network/infimiere.network';

export const PatientEnAttente = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getPatientsActiveTiaps().then((data) => {
      if (data) {
        setPatients(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <InfirmiereBaseLayout clicked='patientAttente'>
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
                {row.quittance.nom} {row.quittance.prenom}
              </p>
              <Space style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                  to={{
                    pathname: '/infirmiere/dossier-medical',
                    state: row,
                  }}
                  onClick={() => {
                    closeModal();
                    console.log(row);
                  }}
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
    dataField: 'medecin.nom',
    text: 'Médecin',
    sort: true,
    formatter: medNameFormatter,
  },
  {
    dataField: 'quittance.patient.nom',
    text: 'Patient',
    sort: true,
    formatter: patientNameFormatter,
  },
  // {
  //   dataField: 'type',
  //   text: 'Type',
  //   sort: true,
  // },
  {
    dataField: 'date_creation',
    text: "Date d'Activation",
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'date_consultation',
    text: 'Date de Consultation',
    sort: true,
  },
  {
    dataField: 'heure_debut',
    text: 'Heure de début',
    sort: true,
  },
  {
    dataField: 'heure_fin',
    text: 'Heure de fin',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
