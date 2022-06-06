/* eslint-disable no-unused-vars */
import { Card, Divider, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { COLORS } from '../../../shared/Enums';
import { Scheduler } from '../../../shared/Scheduler';
import { medNameFormatter } from '../../../shared/Table/cellFormatter';
import {
  getLaborantin,
  getMedecin,
} from '../../secretaire/network/secretaire.network';
import { CaissierBaseLayout } from '../components/caissierBaseLayout';
import { TiapsForm } from '../components/TiapsForm';
import '../css/activateTiaps.css';
import { getPeriodes } from '../network/caissier.network';

export const ActivateTiaps = (props) => {
  const [hoteEncharge, sethoteEncharge] = useState([]);
  const [selectedhoteEncharge, setSelectedhoteEncharge] = useState();
  const [emploieTemps, setEmploieTemps] = useState([]);
  const [filteredEmploie, setFilteredEmploie] = useState([]);
  const [quittance, setQuittance] = useState(props.location.state);

  useEffect(() => {
    getMedecin()
      .then((data) => {
        sethoteEncharge(data?.result);
      })
      .catch((e) => console.log(e));

    getLaborantin()
      .then((data) => {
        sethoteEncharge(data?.result);
      })
      .catch((e) => console.log(e));

    getPeriodes()
      .then((data) => {
        setEmploieTemps(data?.result);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <CaissierBaseLayout clicked='quittance'>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1.5, margin: 5, maxHeight: 1000 }}>
          <Card
            className='box-shadow'
            title={
              quittance.prestation === 'Q-EXAM'
                ? 'Liste des Laborantins'
                : 'Listes des Medecins '
            }
          >
            <Input
              placeholder='rechercher'
              style={{ margin: 5 }}
              onChange={(event) => console.log(event.target.value)}
            />
            {console.log('------------>  quittance ', quittance.prestation)}

            {quittance.prestation === 'Q-EXAM' ? (
              <>
                {' '}
                {hoteEncharge.map((labo, index) => (
                  <span key={index}>
                    <div
                      className='med-info'
                      onClick={() => {
                        const emploiMed = emploieTemps.filter(
                          (item) => item.personnel.id === labo.id,
                        );
                        let finalEmploiTemp = [];
                        for (let emploi of emploiMed) {
                          finalEmploiTemp.push({
                            Id: emploi.id,
                            Subject: emploi.sujet || 'Consultation Médicale',
                            StartTime: new Date(
                              `${emploi.date} ${emploi.heure_debut}`,
                            ),
                            EndTime: new Date(
                              `${emploi.date} ${emploi.heure_fin}`,
                            ),
                            IsAllDay: false,
                            Location:
                              emploi.localisation ||
                              'Structure de soins de santé',
                            Color: COLORS[emploi.id % COLORS.length],
                          });
                        }
                        setFilteredEmploie(finalEmploiTemp);
                        setSelectedhoteEncharge(labo);
                      }}
                    >
                      <p className='med-name'>
                        {medNameFormatter(undefined, labo)}
                        {console.log(
                          '-----------------)',
                          labo,
                          '(------------------------',
                        )}
                      </p>
                      <p className='med-grade'> level 2</p>
                    </div>
                    <Divider />
                  </span>
                ))}
              </>
            ) : (
              <>
                {' '}
                {hoteEncharge.map((med, index) => (
                  <span key={index}>
                    <div
                      className='med-info'
                      onClick={() => {
                        const emploiMed = emploieTemps.filter(
                          (item) => item.personnel.id === med.id,
                        );
                        let finalEmploiTemp = [];
                        for (let emploi of emploiMed) {
                          finalEmploiTemp.push({
                            Id: emploi.id,
                            Subject: emploi.sujet || 'Consultation Médicale',
                            StartTime: new Date(
                              `${emploi.date} ${emploi.heure_debut}`,
                            ),
                            EndTime: new Date(
                              `${emploi.date} ${emploi.heure_fin}`,
                            ),
                            IsAllDay: false,
                            Location:
                              emploi.localisation ||
                              'Structure de soins de santé',
                            Color: COLORS[emploi.id % COLORS.length],
                          });
                        }
                        setFilteredEmploie(finalEmploiTemp);
                        setSelectedhoteEncharge(med);
                      }}
                    >
                      <p className='med-name'>
                        {medNameFormatter(undefined, med)}
                        {console.log(
                          '-----------------(',
                          med,
                          ')----------------',
                        )}
                      </p>
                      <p className='med-grade'>Généraliste</p>
                    </div>
                    <Divider />
                  </span>
                ))}
              </>
            )}
          </Card>
        </div>
        <div style={{ flex: 3, margin: 5 }}>
          <Card className='box-shadow' title='Planning hebdomadaire'>
            {selectedhoteEncharge ? (
              <div>
                <Scheduler allowModif={false} dataSource={filteredEmploie} />

                <Divider />
                <ButtonWithModal
                  buttonText='Activer le TIAPS'
                  modalProps={{
                    title: (
                      <span style={{ color: 'white' }}>Activer le TIAPS</span>
                    ),
                  }}
                  buttonProps={{ type: 'primary', size: 'large' }}
                >
                  {(closeModal) => (
                    <TiapsForm
                      closeModal={closeModal}
                      quittance={quittance}
                      medecin={selectedhoteEncharge}
                    />
                  )}
                </ButtonWithModal>
              </div>
            ) : (
              <p>
                {quittance.prestation === 'Q-EXAM'
                  ? 'choissisez un Laborantin'
                  : 'choissisez un Medecin '}
              </p>
            )}
          </Card>
        </div>
      </div>
    </CaissierBaseLayout>
  );
};
