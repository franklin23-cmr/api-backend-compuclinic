import { Tabs } from 'antd';
import { BatimentTable } from '../components/Infrastructure/Batiments/BatimentTable';
import { InfrastructureTable } from '../components/Infrastructure/Infrastructures/InfrastructureTable';
import { LocalTable } from '../components/Infrastructure/Locaux/LocalTable';
import { PlateauBaseLayout } from '../components/plateauBasedLayout';

export const Infrastructure = ({ location }) => {
  return (
    <PlateauBaseLayout clicked='infrastructures'>
      <Tabs defaultActiveKey={location?.state?.tabIndex || '1'} size='large'>
        <Tabs.TabPane tab='Infrastructures' key='1'>
          <InfrastructureTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Locaux' key='2'>
          <LocalTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Batiments' key='3'>
          <BatimentTable />
        </Tabs.TabPane>
      </Tabs>
    </PlateauBaseLayout>
  );
};
