import { Button, notification, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaClipboardList,
  FaPen,
} from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import attente from '../../../../assets/images/attente.svg';
import healthyPatient from '../../../../assets/images/healthy.svg';
import interne from '../../../../assets/images/interner.svg';
import modifierPatient from '../../../../assets/images/secretaire.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { DateFr } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import { PatientInterneValidation } from '../../../shared/YupValidation/patientInterneValidation';
import { getLits } from '../../plateau_Technique/network/plateauTechnique.network';
import { InfoBox } from '../components/InfoBox';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';
import {
  createListePresence,
  getAllPatients,
  internerPatient,
  libererPatient,
} from '../network/secretaire.network';

export const ListePatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [lits, setLits] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const orderExecute = async () => {
      await getAllPatients().then((data) => {
        if (data) {
          setPatients(data?.result);
        }
      });
      await getLits().then((data) => {
        if (data) {
          setLits(data?.result);
        }
      });
      setIsLoading(false);
    };
    orderExecute();
    // eslint-disable-next-line
  }, []);

  const actionFormatter = (cell, row) => {
    return (
      <Space>
        <Tooltip title='modifier le patient'>
          <ButtonWithModal
            buttonText={<FaPen size={13} color='white' />}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Modifier le Patient</span>
              ),
              width: 650,
            }}
            buttonProps={{ style: { backgroundColor: '#ff8619' } }}
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
                  src={modifierPatient}
                  alt=''
                  style={{ width: 350, height: 350 }}
                />
                <div>
                  <h5 style={{ textAlign: 'center' }}>
                    Voulez vous modifier les informations du patient
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
                    <Link
                      to={{
                        pathname: '/secretaire/update-info-patient',
                        state: row,
                      }}
                      onClick={() => closeModal()}
                    >
                      <Button style={{ width: 200 }} type='primary'>
                        Oui
                      </Button>
                    </Link>
                    <Button
                      style={{ width: 200 }}
                      onClick={() => closeModal()}
                      type='primary'
                      danger
                    >
                      Non
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </ButtonWithModal>
        </Tooltip>
        {row.type === 'Externe' ? (
          <Tooltip title='Interner le patient'>
            <ButtonWithModal
              buttonText={
                <FaAngleDoubleRight
                  size={20}
                  style={{ marginLeft: -5, marginRight: -5 }}
                  color='white'
                />
              }
              modalProps={{
                title: (
                  <span style={{ color: 'white' }}>Interner le Patient</span>
                ),
                width: 650,
              }}
              buttonProps={{ style: { backgroundColor: '#0047ff' } }}
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
                    src={interne}
                    alt=''
                    style={{ width: 350, height: 350 }}
                  />
                  <div>
                    <Space style={{ margin: 20 }}>
                      <InfoBox
                        title={
                          <p
                            style={{
                              fontFamily: 'Tauri',
                              fontSize: 16,
                              margin: 0,
                            }}
                          >
                            Lit Total
                          </p>
                        }
                        subTitle={lits.length}
                      />
                      <InfoBox
                        title={
                          <p
                            style={{
                              fontFamily: 'Tauri',
                              fontSize: 16,
                              margin: 0,
                            }}
                          >
                            Lit Libre
                          </p>
                        }
                        subTitle={
                          lits.filter((lit) => lit.est_libre === true).length
                        }
                      />
                    </Space>
                    <h5 style={{ textAlign: 'center' }}>
                      Voulez-vous interner le patient
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
                      <Link
                        to={{
                          pathname: PatientInterneValidation.isValidSync(row)
                            ? '/secretaire/liste-patients' //meme route, donc rien ne se passe
                            : '/secretaire/completer-info-patient',
                          state: row,
                        }}
                        onClick={() => {
                          if (PatientInterneValidation.isValidSync(row)) {
                            internerPatient(row.id).then((resp) => {
                              if (resp.result.status === 'succès') {
                                notification.success({
                                  message: 'Succès',
                                  description:
                                    'Le patient a été interné avec succès',
                                });
                                setIsLoading(true);
                                getAllPatients().then((data) => {
                                  if (data) {
                                    setPatients(data?.result);
                                    setIsLoading(false);
                                  }
                                });
                              } else {
                                notification.error({
                                  message: 'Echec',
                                  description: resp.result.message,
                                });
                              }
                            });
                          }
                          closeModal();
                        }}
                      >
                        <Button type='primary' style={{ width: 200 }}>
                          Oui
                        </Button>
                      </Link>
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
        ) : (
          <Tooltip title='Libérer le patient'>
            <ButtonWithModal
              buttonText={
                <FaAngleDoubleLeft
                  size={20}
                  style={{ marginLeft: -5, marginRight: -5 }}
                  color='white'
                />
              }
              modalProps={{
                title: (
                  <span style={{ color: 'white' }}>Libérer le Patient</span>
                ),
                width: 650,
              }}
              buttonProps={{ style: { backgroundColor: '#0047ff' } }}
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <FcCalendar size={100} />
                      <p
                        style={{
                          fontSize: 18,
                          fontFamily: 'Montserrat',
                          textAlign: 'center',
                        }}
                      >
                        {DateFr(new Date().toISOString())}
                      </p>
                    </div>

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
                          libererPatient(row.id).then((resp) => {
                            if (resp.result.status === 'succès') {
                              notification.success({
                                message: 'Succès',
                                description:
                                  'Le patient a été libéré avec succès',
                              });
                              setIsLoading(true);
                              getAllPatients().then((data) => {
                                if (data) {
                                  setPatients(data?.result);
                                  setIsLoading(false);
                                }
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
        )}
        <Tooltip title='enregistrer dans la liste de présence'>
          <ButtonWithModal
            buttonText={<FaClipboardList size={15} color='white' />}
            modalProps={{
              title: <span style={{ color: 'white' }}>Liste de présence</span>,
              width: 650,
            }}
            buttonProps={{ style: { backgroundColor: '#1890FF' } }}
          >
            {(closeModal) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img src={attente} alt='' style={{ width: 350, height: 350 }} />
                <div>
                  <h5 style={{ textAlign: 'center' }}>
                    Voulez vous enregister le patient sur la liste de présence ?
                  </h5>

                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type='primary'
                      onClick={() => {
                        createListePresence(row.id).then((resp) => {
                          if (resp.result.id) {
                            notification.success({
                              message: 'Succès',
                              description:
                                'Le patient a été enregistré sur la liste de présence',
                            });
                          } else if (resp.result.patient) {
                            notification.error({
                              message: 'Erreur',
                              description:
                                'Le patient est déjà sur la liste de présence',
                            });
                          }
                          closeModal();
                        });
                      }}
                    >
                      Oui
                    </Button>
                    <Button onClick={() => closeModal()} type='primary' danger>
                      Non
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </ButtonWithModal>
        </Tooltip>
      </Space>
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
  return (
    <SecretaireBaseLayout clicked={'patientList'}>
      <Table
        columns={columns}
        data={patients}
        isLoading={isLoading}
        onSelect={(row, rowIndex) => setIsLoading(row)}
      />
    </SecretaireBaseLayout>
  );
};
