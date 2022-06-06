import { Tabs } from 'antd';
import { Diagnotic } from '../undercomponent/diagnotic';
import { Symptomes } from '../undercomponent/symptomes';

export const Differentiels = ({ consultation }) => {
  return (
    <div>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='Symptomes ' key='1'>
          <Symptomes consultation={consultation} />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Diagnotic' key='2'>
          <Diagnotic consultation={consultation} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
