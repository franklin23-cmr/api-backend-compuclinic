import { Card, Tabs } from 'antd';
import { LitForm } from '../components/Equipement/Lits/LitForm';
import { MaterielForm } from '../components/Equipement/Materiels/MaterielForm';
import { BatimentForm } from '../components/Infrastructure/Batiments/BatimentForm';
import { InfrastructureForm } from '../components/Infrastructure/Infrastructures/InfrastructureForm';
import { LocalForm } from '../components/Infrastructure/Locaux/LocalForm';
import { PlateauBaseLayout } from '../components/plateauBasedLayout';
import { ServiceForm } from '../components/ServiceForm';

export const Enregistrement = ({ location }) => {
  return (
    <PlateauBaseLayout clicked='enregistrement'>
      <Card title='Plateau Technique' className='box-shadow'>
        <Tabs defaultActiveKey={location?.state?.tabIndex || '1'} size='large'>
          <Tabs.TabPane tab='Infrastructures' key='1'>
            <InfrastructureForm dataInForm={location?.state?.infras} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Locaux' key='2'>
            <LocalForm dataInForm={location?.state?.local} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Batiments' key='3'>
            <BatimentForm dataInForm={location?.state?.batiment} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Lits' key='4'>
            <LitForm dataInForm={location?.state?.lit} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Matériels' key='5'>
            <MaterielForm dataInForm={location?.state?.materiel} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Services' key='6'>
            <ServiceForm dataInForm={location?.state?.service} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PlateauBaseLayout>
  );
};
