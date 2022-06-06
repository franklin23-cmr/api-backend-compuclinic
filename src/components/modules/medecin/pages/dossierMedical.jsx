/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd';
import React, { useState } from 'react';
import { DossierMedical } from '../../../shared/DossierMedical';
import { ListeConsultation } from '../components/listeConsultation';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';

export const DossierPatient = ({ location }) => {
  const [consultation, setConsultation] = useState(
    location?.state?.consultation,
  );
  console.log('la location', location);

  return (
    <MedecinBaseLayout clicked={'patient'}>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Informations Générales' key='1'>
          <Card title='Dossier Médical'>
            <DossierMedical
              patient={consultation.dossier.patient}
              readOnly={true}
            />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Liste des consultations' key='2'>
          <ListeConsultation consultation={consultation} />
        </Tabs.TabPane>
      </Tabs>
    </MedecinBaseLayout>
  );
};
