/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getBatiements,
  submitLocal,
  updateLocal,
} from '../../../network/plateauTechnique.network';

export const LocalForm = ({ dataInForm }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();
  console.log({ dataInForm });

  const [batiments, setBatiments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBatiements().then((data) => {
      setBatiments(data?.result);
    });
  }, []);

  const newDataInForm = dataInForm
    ? { ...dataInForm, batiment: dataInForm.batiment?.id }
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
          updateLocal(data, dataInForm.id)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Le local a été modifié',
                });
                history.push('/plateau/infrastructures', { tabIndex: '2' });
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitLocal(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: 'Le local a été crée avec succès',
                });
                history.push('/plateau/infrastructures', { tabIndex: '2' });
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier vos informations de connexion',
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
              message: 'Le nom du local est obligatoire',
            },
          ]}
        >
          <Input placeholder='nom' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='localisation'
          name='localisation'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La localisation du local est obligatoire',
            },
          ]}
        >
          <Input placeholder='localisation' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item label='Description' name='description' hasFeedback>
          <Input placeholder='Description' style={{ minWidth: 270 }} />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Superficie'
          name='supericie'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La superficie  est obligatoire',
            },
          ]}
        >
          <Input
            placeholder='Superficie'
            style={{ minWidth: 270 }}
            type='number'
          />
        </Form.Item>

        <Form.Item
          label='Batiment'
          name='batiment'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le batiment du local est obligatoire',
            },
          ]}
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='Batiment'>
            {batiments.map((bat) => (
              <Select.Option key={bat.id} value={bat.id}>
                {bat.nom}
              </Select.Option>
            ))}
          </Select>
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
