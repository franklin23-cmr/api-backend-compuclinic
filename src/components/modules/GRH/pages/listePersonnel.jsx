import { Tabs } from 'antd';
import { GrhBaseLayout } from '../components/grhBaseLayout';
import { CaissierTable } from '../components/PersonnelTables/CaissierTable';
import { InfirmiereTable } from '../components/PersonnelTables/InfermiereTable';
import { LaborantinTable } from '../components/PersonnelTables/LaborantinTable';
import { MedecinTable } from '../components/PersonnelTables/MedecinTable';
import { SecretaireTable } from '../components/PersonnelTables/SecretaireTable';
import { StagiaireTable } from '../components/PersonnelTables/StagiaireTable';

export const ListePersonnel = ({ location }) => {
  return (
    <GrhBaseLayout clicked={'personnel'}>
      <Tabs defaultActiveKey={location?.state?.tabIndex || '1'} size='large'>
        <Tabs.TabPane tab='Médecin' key='1'>
          <MedecinTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Sécretaire' key='2'>
          <SecretaireTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Caissier' key='3'>
          <CaissierTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Infirmière' key='4'>
          <InfirmiereTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Laborantin' key='5'>
          <LaborantinTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Stagiaire' key='6'>
          <StagiaireTable />
        </Tabs.TabPane>
      </Tabs>
    </GrhBaseLayout>
  );
};
