import { Button, notification, Space, Tabs, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import healthyPatient from '../../../../assets/images/healthy.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  patientNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';
import {
  getListeInternement,
  libererPatient,
} from '../network/secretaire.network';

export const ListeInternement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listes, setListes] = useState([]);

  const actionFormatter = (cell, row) => {
    return (
      <Tooltip title='Libérer le patient'>
        <ButtonWithModal
          buttonText={
            <FaMinus
              size={20}
              style={{ marginLeft: -5, marginRight: -5 }}
              color='white'
            />
          }
          modalProps={{
            title: <span style={{ color: 'white' }}>Libérer le Patient</span>,
            width: 650,
          }}
          buttonProps={{ style: { backgroundColor: '#f44336' } }}
        >
          {(closeModal) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <img
                src={healthyPatient}
                alt=''
                style={{ width: 350, height: 350 }}
              />
              <div>
                <h5 style={{ textAlign: 'center' }}>
                  Voulez-vous libérer le patient
                </h5>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                >
                  {row.nom} {row.prenom}
                </p>
                <Space
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    type='primary'
                    style={{ width: 200 }}
                    onClick={() => {
                      libererPatient(row.patient.id).then((resp) => {
                        if (resp.result.status === 'succès') {
                          notification.success({
                            message: 'Succès',
                            description: 'Le patient a été libéré avec succès',
                          });
                          setIsLoading(true);
                          getListeInternement().then((data) => {
                            setListes(data?.result);
                            setIsLoading(false);
                          });
                        } else {
                          notification.error({
                            message: 'Echec',
                            description:
                              'Une érreur est survenu. Veuillez réssayer',
                          });
                        }
                      });
                      closeModal();
                    }}
                  >
                    Oui
                  </Button>
                  <Button
                    type='primary'
                    danger
                    style={{ width: 200 }}
                    onClick={() => closeModal()}
                  >
                    Non
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
      dataField: 'patient',
      text: 'Patient',
      sort: true,
      formatter: patientNameFormatter,
    },
    {
      dataField: 'lit.numero_serie',
      text: 'Numéro de série du lit',
      sort: true,
    },
    {
      dataField: 'lit.numero',
      text: 'Numéro du lit',
      sort: true,
    },
    {
      dataField: 'lit.local.nom',
      text: 'Nom du local',
      sort: true,
    },
    {
      dataField: 'date_internement',
      text: "Date d'internement",
      sort: true,
      formatter: dateFormatter,
    },
    {
      dataField: 'date_sortie',
      text: 'Date de sortie',
      sort: true,
      formatter: dateFormatter,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];

  useEffect(() => {
    getListeInternement().then((data) => {
      setListes(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <SecretaireBaseLayout clicked='listInternement'>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Internement en cours' key='1'>
          <Table
            isLoading={isLoading}
            data={listes.filter((item) => item.en_cours === true)}
            columns={columns.filter((item) => item.dataField !== 'date_sortie')}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Historique des internements' key='2'>
          <Table
            isLoading={isLoading}
            data={listes.filter((item) => item.en_cours === false)}
            columns={columns.filter((item) => item.dataField !== 'action')}
          />
        </Tabs.TabPane>
      </Tabs>
    </SecretaireBaseLayout>
  );
};
