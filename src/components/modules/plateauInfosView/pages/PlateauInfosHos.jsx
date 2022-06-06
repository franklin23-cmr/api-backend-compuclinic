import { Space, Tabs } from 'antd';
import { PersonnelView } from '../components/PersonnelView';
import { PlateauServiceView } from '../components/PlateauServiceView';
import { PlateauView } from '../components/PlateauView';
import { Profile } from '../components/SideInfrasInfo/Profile';

export const PlateauInfosHos = ({ location }) => {
  return (
    <div className='plateau-container'>
      <Space size={30} style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Profile infrastructure={location?.state.infrastructure} />
        <Tabs defaultActiveKey='1' size='large'>
          <Tabs.TabPane tab='Personnel' key='1'>
            <PersonnelView infrastructure={location?.state.infrastructure} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Plateau Technique' key='2'>
            <PlateauView infrastructure={location?.state.infrastructure} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Services' key='3'>
            <PlateauServiceView infrastructure={location?.state.infrastructure}/>
          </Tabs.TabPane>
        </Tabs>
      </Space>
    </div>
  );
};
