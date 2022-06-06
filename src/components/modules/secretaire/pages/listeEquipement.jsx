import { Tabs } from 'antd';
import { LitTable } from '../../plateau_Technique/components/Equipement/Lits/LitTable';
import { MaterielTable } from '../../plateau_Technique/components/Equipement/Materiels/MaterielTable';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';

export const ListeEquipement = () => {
  return (
    <SecretaireBaseLayout clicked='equipements'>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Lits' key='1'>
          <LitTable bySecretaire={true} />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Materiels' key='2'>
          <MaterielTable bySecretaire={true} />
        </Tabs.TabPane>
      </Tabs>
    </SecretaireBaseLayout>
  );
};
