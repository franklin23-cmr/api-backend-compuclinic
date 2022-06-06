import { Tabs } from 'antd';
import { useState } from 'react';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import { Parametres } from '../components/parametres';

export const BulletinResultat = ({ location }) => {
  const [consultation] = useState(location?.state?.consultation);
  console.log('la location', location);
  return (
    <MedecinBaseLayout clicked='patient'>
      <Tabs defaultActiveKey='1' size='large'>
        <Tabs.TabPane tab='examen' key='1'>
          <Parametres consultation={consultation} />
        </Tabs.TabPane>

        {/* <Tabs.TabPane key='2' tab='examen de sang'>
          <Parametres consultation={consultation} />
        </Tabs.TabPane>

        <Tabs.TabPane tab='examen sels' key='3'>
          <Parametres consultation={consultation} />
        </Tabs.TabPane> */}
      </Tabs>
    </MedecinBaseLayout>
  );
};
