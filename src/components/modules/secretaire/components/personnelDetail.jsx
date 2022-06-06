import { Button, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { getAge } from '../../../shared/DateToFrench';
import { COLORS } from '../../../shared/Enums';
import { Scheduler } from '../../../shared/Scheduler';
import { getPeriodes } from '../../caissier/network/caissier.network';

export const PersonnelDetail = ({ personnel, closeModal }) => {
  const [emploieTemps, setEmploieTemps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeriodes()
      .then((data) => {
        const emploiMed = data?.result.filter(
          (item) => item.personnel.id === personnel.id,
        );
        let finalEmploiTemp = [];
        for (let emploi of emploiMed) {
          finalEmploiTemp.push({
            Id: emploi.id,
            Subject: emploi.sujet || 'Consultation Médicale',
            StartTime: new Date(`${emploi.date} ${emploi.heure_debut}`),
            EndTime: new Date(`${emploi.date} ${emploi.heure_fin}`),
            IsAllDay: false,
            Location: emploi.localisation || 'Structure de soins de santé',
            Color: COLORS[emploi.id % COLORS.length],
          });
        }
        setEmploieTemps(finalEmploiTemp);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ fontFamily: 'Tauri', fontSize: 15 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        {isLoading ? (
          <Spin spinning={isLoading} size='large' />
        ) : (
          <Space>
            <ButtonWithModal
              buttonText='Emploie du temps'
              buttonProps={{ type: 'primary' }}
              modalProps={{
                title: (
                  <span style={{ color: 'white' }}>
                    Emploie du temps du Personnel
                  </span>
                ),
                width: 1000,
              }}
            >
              {(closePeriodeModal) => (
                <Scheduler allowModif={false} dataSource={emploieTemps} />
              )}
            </ButtonWithModal>
            <Button
              type='primary'
              danger
              onClick={() => closeModal()}
              style={{ display: 'block' }}
            >
              Fermer
            </Button>
          </Space>
        )}
      </div>

      <Space size={30}>
        <div>
          <p>Nom </p>
          <p>Prénom </p>
          <p>Matricule </p>
          <p>Age </p>
          <p>Ancienneté</p>
          <p>Spécialité </p>
          <p>Année d'expérience </p>
          <p>Poste </p>
          <p>Téléphone </p>
          <p>N° CNI</p>
          <p>Domicile </p>
          <p>Etat Civil </p>
          <p>Email </p>
        </div>
        <div>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div>
          <p>{personnel?.nom} </p>
          <p>{personnel?.prenom} </p>
          <p>{personnel?.matricule} </p>
          <p>{getAge(personnel?.date_naissance) || '----'}</p>
          <p>{getAge(personnel?.date_creation) || '----'} </p>
          <p>{personnel?.profilspecialiste?.specialite || '----'} </p>
          <p>
            {getAge(personnel?.profilspecialiste?.date_obtention) || '----'}
          </p>
          <p>{personnel?.poste?.nom || '----'}</p>
          <p>{personnel?.telephone || '----'} </p>
          <p>{personnel?.CNI}</p>
          <p>{personnel?.domicile}</p>
          <p>{personnel?.etat_civil}</p>
          <p>{personnel?.email}</p>
        </div>
      </Space>
    </div>
  );
};
