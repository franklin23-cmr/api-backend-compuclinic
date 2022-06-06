import { Tabs } from 'antd';
import { Examens } from '../undercomponent/examens';
import { Medicaments } from '../undercomponent/medicaments';
import { Recommandations } from '../undercomponent/recommandations';

export const Prescriptions = ({ consultation }) => {
  return (
    <div>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Recommandations ' key='1'>
          <Recommandations consultation={consultation} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Prescription Médicale' key='2'>
          <Medicaments consultation={consultation} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Prescription Examen' key='3'>
          <Examens consultation={consultation} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
