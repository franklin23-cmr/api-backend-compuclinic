import { Card, Tabs } from 'antd';
import React, { useState } from 'react';
import { GrhBaseLayout } from '../components/grhBaseLayout';
import { CaissierForm } from '../components/PersonnelForms/CaissierForm';
import { InfirmierForm } from '../components/PersonnelForms/InfirmierForm';
import { LaborantinForm } from '../components/PersonnelForms/LaborantinForm';
import { MedecinForm } from '../components/PersonnelForms/MedecinForm';
import { SecretaireForm } from '../components/PersonnelForms/SecretaireForm';
import { StagiaireForm } from '../components/PersonnelForms/StagiaireForm';

export const InscrirePersonnel = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GrhBaseLayout clicked={'employe'}>
      <Card title='Enregistrer un nouveau personnel' className='box-shadow'>
        <Tabs defaultActiveKey={location?.state?.tabIndex || '1'} size='large'>
          <Tabs.TabPane tab='Médecin' key='1'>
            <MedecinForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dataInForm={location?.state?.medecin}
              submitButtonText='Modifiez les informations du Medecin'
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Sécretaire' key='2'>
            <SecretaireForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dataInForm={location?.state?.secretaire}
              submitButtonText='Modifiez les informations de la secretaire'
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Infirmière' key='3'>
            <InfirmierForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dataInForm={location?.state?.infirmiere}
              submitButtonText="Modifiez les informations de l'infirmiere"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Caissier' key='4'>
            <CaissierForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dataInForm={location?.state?.caissier}
              submitButtonText='Modifiez les informations du caissier'
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Laborantin' key='5'>
            <LaborantinForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dataInForm={location?.state?.laborantin}
              submitButtonText='Modifiez les informations du laborantin'
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Stagiaire' key='6'>
            <StagiaireForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dataInForm={location?.state?.stagiaire}
              submitButtonText='Modifiez les informations du stagiaire'
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </GrhBaseLayout>
  );
};

export default InscrirePersonnel;
