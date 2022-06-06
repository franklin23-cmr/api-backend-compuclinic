import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClipboardList, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import modifierPatient from '../../../../../assets/images/secretaire.svg';
import { ButtonWithModal } from '../../../../shared/ButtonWithModal';
import { COLORS } from '../../../../shared/Enums';
import { Scheduler } from '../../../../shared/Scheduler';
import { Table } from '../../../../shared/Table';
import {
  caissierNameFormatter,
  dateFormatterNoTime,
} from '../../../../shared/Table/cellFormatter';
import { getPeriodes } from '../../../caissier/network/caissier.network';
import { PersonnelDetail } from '../../../secretaire/components/personnelDetail';
import { getInfirmiere } from '../../network/grh.network';

export const InfirmiereTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [infirmiers, setInfirmiers] = useState([]);
  const [emploieTemps, setEmploieTemps] = useState([]);

  useEffect(() => {
    const syncExecution = async () => {
      await getInfirmiere()
        .then((data) => {
          setInfirmiers(data?.result);
        })
        .catch((e) => console.log(e));
      await getPeriodes()
        .then((data) => {
          setEmploieTemps(data?.result);
        })
        .catch((e) => console.log(e));
    };
    syncExecution().then(() => setIsLoading(false));
  }, []);

  const actionFormatter = (cell, row) => {
    return (
      <Space>
        <Tooltip title='détails du infirmiere'>
          <ButtonWithModal
            buttonText={<FaClipboardList size={18} color='white' />}
            buttonProps={{ style: { backgroundColor: '#ff8619' } }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Détails du Personnel</span>
              ),
            }}
          >
            {(closeModal) => (
              <PersonnelDetail personnel={row} closeModal={closeModal} />
            )}
          </ButtonWithModal>
        </Tooltip>
        <Tooltip title='modifier infirmiere'>
          <ButtonWithModal
            buttonText={<FaPen size={13} color='white' />}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Modifier l'infirmiere</span>
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
                    Voulez vous modifier les informations de l'infirmière
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
                        pathname: '/grh/inscription-personnel',
                        state: { infirmiere: row, tabIndex: '3' },
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
        <Tooltip title='Emploie du temps'>
          <ButtonWithModal
            buttonText={<FaCalendarAlt size={18} color='white' />}
            buttonProps={{ style: { backgroundColor: '#0047ff' } }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>
                  Emploie du temps de l'infirmiere
                </span>
              ),
              width: 1000,
            }}
          >
            {(closePeriodeModal) => {
              const emploiMed = emploieTemps.filter(
                (item) => item.personnel.id === row.id,
              );
              let finalEmploiTemp = [];
              for (let emploi of emploiMed) {
                finalEmploiTemp.push({
                  Id: emploi.id,
                  Subject: emploi.sujet || 'Travail Journaliser',
                  StartTime: new Date(`${emploi.date} ${emploi.heure_debut}`),
                  EndTime: new Date(`${emploi.date} ${emploi.heure_fin}`),
                  IsAllDay: false,
                  Location:
                    emploi.localisation || 'Structure de soins de santé',
                  Color: COLORS[emploi.id % COLORS.length],
                });
              }
              return (
                <Scheduler allowModif={false} dataSource={finalEmploiTemp} />
              );
            }}
          </ButtonWithModal>
        </Tooltip>
      </Space>
    );
  };

  const columns = [
    {
      dataField: 'nom',
      text: 'Infirmière',
      sort: true,
      formatter: caissierNameFormatter,
    },
    {
      dataField: 'matricule',
      text: 'Matricule',
      sort: true,
    },
    {
      dataField: 'etat_civil',
      text: 'Etat civil',
      sort: true,
    },
    {
      dataField: 'poste.nom',
      text: 'Poste',
      sort: true,
    },
    {
      dataField: 'telephone',
      text: 'Téléphone',
      sort: true,
    },
    {
      dataField: 'domicile',
      text: 'Domicile',
      sort: true,
    },
    {
      dataField: 'date_creation',
      text: "Date d'arrivé",
      sort: true,
      formatter: dateFormatterNoTime,
    },
    {
      dataField: 'Actions',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];

  return <Table isLoading={isLoading} data={infirmiers} columns={columns} />;
};
