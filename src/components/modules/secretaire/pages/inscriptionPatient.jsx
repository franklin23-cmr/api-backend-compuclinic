import { Card, Tabs } from 'antd';
import React from 'react';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';
import { Externe } from './externe';
import { Interne } from './interne';

const { TabPane } = Tabs;

export default class Patient extends React.Component {
  render() {
    return (
      <SecretaireBaseLayout clicked={'patient'}>
        <Card title="Formulaire d'Inscription Patient" loading={false}>
          <Tabs
            defaultActiveKey='1'
            size='large'
            tabBarStyle={{ width: '100%' }}
          >
            <TabPane tab='Patient Externe' key='1'>
              <Externe />
            </TabPane>

            <TabPane tab='Patient Interne' key='2'>
              <Interne />
            </TabPane>
          </Tabs>
        </Card>
      </SecretaireBaseLayout>
    );
  }
}
