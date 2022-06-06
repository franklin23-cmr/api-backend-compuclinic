import { Tabs } from 'antd';
import { AGV } from '../components/AGV';
import { BGS } from '../components/BGS';
import { BSC } from '../components/BSC';
import { CaissierBaseLayout } from '../components/caissierBaseLayout';

export const Bons = () => {
  return (
    <CaissierBaseLayout clicked='bons'>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Accord de Gratuité Volontaire (AGV)' key='1'>
          <AGV />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Bon de Gratuité Sociale (BGS)' key='2'>
          <BGS />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Bon de Soins à Crédit (BSC)' key='3'>
          <BSC />
        </Tabs.TabPane>
      </Tabs>
    </CaissierBaseLayout>
  );
};
