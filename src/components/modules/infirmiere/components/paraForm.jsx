/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getServices } from '../../plateau_Technique/network/plateauTechnique.network';
import { submitDebutConsultation } from '../network/infimiere.network';

export const ParaForm = ({ closeModal, medecin, linkToConsult, patient }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getServices().then((data) => {
      if (data) {
        setServices(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{
        dossier: `${patient.dossier.matricule}`,
        medecin: `${medecin.nom}`,
      }}
      scrollToFirstError
      onFinish={async (data) => {
        data.dossier = patient.dossier.id;
        data.medecin = medecin.id;
        console.log(data);
        setIsLoading(true);
        submitDebutConsultation(data)
          .then((data) => {
            if (data.result) {
              notification.success({
                message: 'Succès',
                description: 'La consultation a débuter',
              });
              setIsLoading(false);
              closeModal();
              history.push(linkToConsult, {
                patient,
                consultation: data.result,
              });
            } else {
              notification.error({
                message: 'Erreur',
                description: 'Echec de la création de la consultation',
              });
              setIsLoading(false);
            }
          })
          .catch((e) => console.log(e));
      }}
    >
      <Form.Item
        label='Dossier'
        name='dossier'
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input placeholder='dossier' disabled />
      </Form.Item>
      <Form.Item label='Medecin' name='medecin'>
        <Input placeholder='medecin' disabled />
      </Form.Item>
      <Form.Item
        label='Type'
        name='type'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Le type doit être précisée',
          },
        ]}
      >
        <Select style={{ width: '100%' }} placeholder='type'>
          {Type.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.display_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label='Service'
        name='service'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Le service doit être précisée',
          },
        ]}
      >
        <Select style={{ width: '100%' }} placeholder='service'>
          {services.map((item) => (
            <Select.Option value={item.id} key={item.id}>
              {item.nom}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Débuter la Consultation
        </Button>
      </Form.Item>
    </Form>
  );
};

const Type = [
  {
    value: 0,
    display_name: 'Consultation',
  },
  {
    value: 1,
    display_name: 'Suivi',
  },
];
