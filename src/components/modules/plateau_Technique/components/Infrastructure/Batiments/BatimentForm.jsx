/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getInfrastructures,
  submitBatiment,
  updateBatiment,
} from '../../../network/plateauTechnique.network';

export const BatimentForm = ({ dataInForm }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();

  const [infrastructures, setInfrastructures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInfrastructures().then((data) => {
      setInfrastructures(data?.result);
    });
  }, []);

  console.log(dataInForm);
  const newDataInForm = dataInForm
    ? { ...dataInForm, infrastructure: dataInForm.infrastructure.id }
    : undefined;

  return (
    <Form
      layout={formLayout}
      form={form}
      size='large'
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={newDataInForm}
      scrollToFirstError
      onFinish={async (data) => {
        let dataToPost = data;
        setIsLoading(true);

        if (dataInForm) {
          console.log(data);
          data = { ...data, id: dataInForm.id };
          console.log(data);
          updateBatiment(data, dataInForm.id)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Le Batiment a été modifié',
                });
                history.push('/plateau/infrastructures', { tabIndex: '3' });
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitBatiment(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: 'Le Batiment a été crée avec succès',
                });
                history.push('/plateau/infrastructures', { tabIndex: '3' });
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        }
      }}
    >
      <Space size={20}>
        <Form.Item
          label='Nom'
          name='nom'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le nom du batiment est obligatoire',
            },
          ]}
        >
          <Input placeholder='Nom' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Surface'
          name='surface'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La surface du batiment est obligatoire',
            },
          ]}
        >
          <Input
            placeholder='Surface'
            style={{ minWidth: 270 }}
            type='number'
          />
        </Form.Item>

        <Form.Item
          label='Infrastructure'
          name='infrastructure'
          hasFeedback
          rules={[
            {
              required: true,
              message: "L'infrastructure du batiment est obligatoire",
            },
          ]}
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='Infrastructure'>
            {infrastructures.map((infras) => (
              <Select.Option key={infras.id} value={infras.id}>
                {infras.nom}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Space>
      <Space>
        <Form.Item
          label='Localisation'
          name='localisation'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La localisation du batiment est obligatoire',
            },
          ]}
        >
          <Input placeholder='Localisation' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item label='Description' name='description' hasFeedback>
          <Input placeholder='Description' style={{ minWidth: 270 }} />
        </Form.Item>
      </Space>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Terminer l'Enregistrement
        </Button>
      </Form.Item>
    </Form>
  );
};
