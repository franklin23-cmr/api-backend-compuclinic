/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select } from 'antd';
import React, { useState } from 'react';
import { submitAvg } from '../network/medecin.network';

export const AvgForm = ({ closeModal, patient, prestataire }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{
        prestataire: `${prestataire.nom}`,
        patient: `${patient.nom} ${patient.prenom}`,
      }}
      scrollToFirstError
      onFinish={async (data) => {
        data.prestataire = prestataire.id;
        data.patient = patient.id;
        console.log(data);
        setIsLoading(true);
        submitAvg(data)
          .then((data) => {
            if (data) {
              notification.success({
                message: 'Succès',
                description: 'Vous avez accordé une AGV à ce patient',
              });
              setIsLoading(false);
              closeModal();
            } else {
              notification.error({
                message: 'Erreur',
                description: "l'accord de l'AGV a echoué",
              });
              setIsLoading(false);
            }
          })
          .catch((e) => console.log(e));
      }}
    >
      <Form.Item label='Patient' name='patient' hasFeedback>
        <Input placeholder='patient' disabled />
      </Form.Item>
      <Form.Item label='Prestataire' name='prestataire' hasFeedback>
        <Input placeholder='prestataire' disabled />
      </Form.Item>
      <Form.Item
        label='Prestation'
        name='prestation'
        rules={[
          {
            required: true,
            message: 'La prestation doit être précisée',
          },
        ]}
      >
        <Select style={{ width: '100%' }} placeholder='prestation'>
          {prestation.map((item) => (
            <Select.Option value={item.value}>
              {item.display_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Terminer
        </Button>
      </Form.Item>
    </Form>
  );
};

const prestation = [
  {
    value: 'Q-CONSULT',
    display_name: 'Consultation',
  },
  {
    value: 'Q-EXAM',
    display_name: 'Examen',
  },
  {
    value: 'Q-PHARMA',
    display_name: 'Pharmacie',
  },
  {
    value: 'Q-SA',
    display_name: 'Q-SA',
  },
  {
    value: 'Q-SI',
    display_name: 'Q-SI',
  },
  {
    value: 'Q-DIV',
    display_name: 'Q-DIV',
  },
  {
    value: 'Q-FD',
    display_name: 'Q-FD',
  },
];
