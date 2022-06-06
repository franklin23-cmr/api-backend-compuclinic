import { Tabs } from 'antd';
import { useState } from 'react';
import { Differentiels } from '../components/differentiels';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import { Parametres } from '../components/parametres';
import { Prescriptions } from '../components/prescriptions';
import { ResumeConsultation } from './resumeConsultation';

export const Consultations = ({ location }) => {
  const [consultation] = useState(location?.state?.consultation);
  console.log('la location', location);
  return (
    <MedecinBaseLayout clicked='patient'>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Prise Paramètres ' key='3'>
          <Parametres consultation={consultation} />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Differentiels' key='2'>
          <Differentiels consultation={consultation} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Prescriptions' key='1'>
          <Prescriptions consultation={consultation} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Resumé consultation' key='4'>
          <ResumeConsultation consultation={consultation} />
        </Tabs.TabPane>
      </Tabs>
    </MedecinBaseLayout>
  );
};
