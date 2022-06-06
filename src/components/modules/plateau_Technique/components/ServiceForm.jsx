/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getBatiements,
  getPersonnel,
  submitService,
  updateService,
} from '../network/plateauTechnique.network';

export const ServiceForm = ({ dataInForm }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();

  const [personnel, setPersonnel] = useState([]);
  const [batiment, setBatiment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBatiements().then((data) => {
      setBatiment(data?.result);
    });
    getPersonnel().then((data) => {
      setPersonnel(data?.result);
    });
  }, []);

  console.log(dataInForm);
  const newDataInForm = dataInForm
    ? {
        ...dataInForm,
        batiment: dataInForm.batiment.id,
        chef: dataInForm.chef?.nom,
      }
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
          updateService(data, dataInForm.id)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Le service a été modifié',
                });
                history.push('/plateau/services');
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitService(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: 'Le service a été crée avec succès',
                });
                history.push('/plateau/services');
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
              message: 'Le nom du service dans est obligatoire',
            },
          ]}
        >
          <Input placeholder='nom' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Batiment'
          name='batiment'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le batiment est obligatoire',
            },
          ]}
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='batiment'>
            {batiment.map((bat) => (
              <Select.Option key={bat.id} value={bat.id}>
                {bat.nom}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Chef de service'
          name='chef'
          hasFeedback
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='chef de service'>
            {personnel.map((pers) => (
              <Select.Option key={pers.id} value={pers.id}>
                {`${pers.nom} ${pers.prenom} : ${pers.type_personnel}`}
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
