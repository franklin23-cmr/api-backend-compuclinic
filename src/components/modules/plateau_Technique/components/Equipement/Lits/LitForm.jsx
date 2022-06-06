/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getLocaux,
  submitLit,
  updateLit,
} from '../../../network/plateauTechnique.network';

export const LitForm = ({ dataInForm }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();

  const [local, setLocal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLocaux().then((data) => {
      setLocal(data?.result);
    });
  }, []);

  console.log(dataInForm);
  const newDataInForm = dataInForm
    ? { ...dataInForm, local: dataInForm.local.id }
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
          data = { ...data, id: dataInForm.id };
          console.log(data);
          updateLit(data, dataInForm.id)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Le lit a été modifié',
                });
                history.push('/plateau/equipements');
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitLit(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: 'Le lit a été crée avec succès',
                });
                history.push('/plateau/equipements');
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier vos informations renseigné',
                });
              }
            })
            .catch((err) => console.log(err));
        }
      }}
    >
      <Space size={20}>
        <Form.Item
          label='Numero'
          name='numero'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le numéro du lit dans le local est obligatoire',
            },
          ]}
        >
          <Input placeholder='numero' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Numero de série'
          name='numero_serie'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le numéro de série est obligatoire',
            },
          ]}
        >
          <Input placeholder='numero_serie' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Local'
          name='local'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le local est obligatoire',
            },
          ]}
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='local'>
            {local.map((loc) => (
              <Select.Option key={loc.id} value={loc.id}>
                {loc.nom}
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
