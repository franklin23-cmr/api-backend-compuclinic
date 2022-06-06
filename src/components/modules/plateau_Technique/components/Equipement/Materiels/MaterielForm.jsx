/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TYPE_MATERIEL } from '../../../../../shared/Enums';
import {
  getLocaux,
  submitMateriel,
  updateMateriel,
} from '../../../network/plateauTechnique.network';

export const MaterielForm = ({ dataInForm }) => {
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
  console.log(newDataInForm);
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
          updateMateriel(data, dataInForm.id)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Le matériel a été modifié',
                });
                history.push('/plateau/equipements', { tabIndex: '2' });
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitMateriel(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: 'Le matériel a été crée avec succès',
                });
                history.push('/plateau/equipements', { tabIndex: '2' });
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
          label='Nom'
          name='nom'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le nom du matériel de est obligatoire',
            },
          ]}
        >
          <Input placeholder='numero' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Type du matériel'
          name='type'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le type du matériel est obligatoire',
            },
          ]}
          style={{ minWidth: 270 }}
        >
          <Select placeholder='type'>
            {TYPE_MATERIEL.map((type) => (
              <Select.Option key={type.value} value={type.value}>
                {type.label}
              </Select.Option>
            ))}
          </Select>
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
