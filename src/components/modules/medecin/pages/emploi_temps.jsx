/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { COLORS } from '../../../shared/Enums';
import { Scheduler } from '../../../shared/Scheduler';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import { getMedecin, getPeriodes } from '../network/medecin.network';

export const EmploiTemps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [medecin, setMedecin] = useState();
  const [emploieTemps, setEmploieTemps] = useState([]);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    getMedecin(user.id)
      .then(async (med) => {
        setMedecin(med?.result);
        getPeriodes().then((data) => {
          if (data) {
            const emploiMed = data.result.filter(
              (item) => item.personnel.id === med.result.id,
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
            console.log(finalEmploiTemp);
            setIsLoading(false);
          }
        });
      })
      .catch((e) => console.log(e));

    // eslint-disable-next-line
  }, []);

  return (
    <MedecinBaseLayout clicked='emploi'>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <BounceLoader loading={isLoading} size={50} color='#417ef7' />
        </div>
      ) : (
        <Scheduler allowModif={false} dataSource={emploieTemps} />
      )}
    </MedecinBaseLayout>
  );
};
