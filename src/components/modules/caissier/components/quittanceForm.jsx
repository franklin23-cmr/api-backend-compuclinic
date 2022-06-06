/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { submitQuittance } from '../network/caissier.network';

export const QuittanceForm = ({ closeModal, patient }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [isLoading, setIsLoading] = useState(false);
  const connectedUser = useSelector((state) => state.userReducer).user;

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{
        patient: `${patient.nom} ${patient.prenom}`,
        caissier: `${connectedUser.nom} ${connectedUser.prenom}`,
      }}
      scrollToFirstError
      onFinish={async (data) => {
        data.caissier = connectedUser.id;
        data.patient = patient.id;
        console.log(data);
        setIsLoading(true);
        submitQuittance(data)
          .then((data) => {
            if (data) {
              notification.success({
                message: 'Succès',
                description: 'La quittance du patient a été payé',
              });
              setIsLoading(false);
              closeModal();
            } else {
              notification.error({
                message: 'Erreur',
                description: "La quittance du patient n'a pas été payé",
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
      <Form.Item label='Caissier' name='caissier' hasFeedback>
        <Input placeholder='caissier' disabled />
      </Form.Item>
      <Form.Item
        label='Prestation'
        name='prestation'
        rules={[
          {
            required: true,
            message: 'La prestation doit être précisé',
          },
        ]}
      >
        <Select style={{ width: '100%' }} placeholder='prestation'>
          {prestation.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.display_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Rubrique'
        name='rubrique'
        rules={[
          {
            required: true,
            message: 'La rubrique est obligatoire',
          },
        ]}
      >
        <Select style={{ width: '100%' }} placeholder='rubrique'>
          {rubrique.map((item) => (
            <Select.Option value={item.value}>
              {item.display_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Montant TTC'
        name='montant_TTC'
        rules={[
          {
            required: true,
            message: 'La prestation doit être précisé',
          },
        ]}
      >
        <Input placeholder='montant total' type='number' />
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

const rubrique = [
  {
    value: 'MG-CO',
    display_name: 'Consultation par médecin généraliste',
  },
  {
    value: 'MG-CRV',
    display_name: 'Consultation sur Rendez-vous par médecin généraliste',
  },
  {
    value: 'MS-CO',
    display_name: 'Consultation par médecin spécialiste',
  },
  {
    value: 'MS-CRV',
    display_name: 'Consultation sur Rendez-vous par médecin spécialiste',
  },
];
