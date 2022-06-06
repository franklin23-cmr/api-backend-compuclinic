import { Tabs } from 'antd';
import { LitTable } from '../components/Equipement/Lits/LitTable.jsx';
import { MaterielTable } from '../components/Equipement/Materiels/MaterielTable.jsx';
import { PlateauBaseLayout } from '../components/plateauBasedLayout';

export const Equipement = ({ location }) => {
  return (
    <PlateauBaseLayout clicked='equipements'>
      <Tabs defaultActiveKey={location?.state?.tabIndex || '1'} size='large'>
        <Tabs.TabPane tab='Lits' key='1'>
          <LitTable />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Materiels' key='2'>
          <MaterielTable />
        </Tabs.TabPane>
      </Tabs>
    </PlateauBaseLayout>
  );
};
