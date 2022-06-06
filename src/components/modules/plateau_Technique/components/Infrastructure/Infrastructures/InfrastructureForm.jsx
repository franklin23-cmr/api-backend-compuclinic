/* eslint-disable no-unused-vars */
import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
  Space,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getPersonnel,
  submitInfrastructure,
  updateInfrastructure,
} from '../../../network/plateauTechnique.network';

export const InfrastructureForm = ({ dataInForm }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();
  console.log({ dataInForm });

  const [personnel, setPersonnel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPersonnel().then((data) => {
      setPersonnel(data?.result);
    });
  }, []);

  const newDataInForm = dataInForm
    ? {
        ...dataInForm,
        date_creation: moment(dataInForm.date_creation, 'YYYY-MM-DD'),
        directeur: dataInForm.directeur?.id,
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
        dataToPost.date_creation =
          dataToPost.date_creation.format('YYYY-MM-DD');
        setIsLoading(true);

        if (dataInForm) {
          console.log(data);
          data = { ...data, id: dataInForm.id };
          updateInfrastructure(data, dataInForm.id)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: "L'insfracture a été modifié",
                });
                history.push('/plateau/infrastructures');
              } else {
                notification.error({
                  message: 'Une erreur a été rencontrée',
                  description: 'Vérifier les informations renseignées',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitInfrastructure(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: "L'insfracture a été crée avec succès",
                });
                history.push('/plateau/infrastructures');
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
              message: 'Le nom de est obligatoire',
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
              message: 'La localisation est obligatoire',
            },
          ]}
        >
          <Input placeholder='localisation' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Classe'
          name='classe'
          hasFeedback
          rules={[
            {
              required: true,
              message: "La classe de l'insfracture obligatoire",
            },
          ]}
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='classe'>
            <Select.Option value='A'>A</Select.Option>
            <Select.Option value='B'>B</Select.Option>
            <Select.Option value='C'>C</Select.Option>
          </Select>
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Date de Création'
          name='date_creation'
          hasFeedback
          rules={[
            {
              required: true,
              type: 'object',
              message: 'Selectionnez la date de création',
            },
          ]}
        >
          <DatePicker
            disabledDate={(current) => current > moment().endOf('day')}
            style={{ minWidth: 270 }}
          />
        </Form.Item>

        <Form.Item
          label='Téléphone'
          name='telephone'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le contact  est obligatoire',
            },
          ]}
        >
          <Input placeholder='téléphone' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label='Ville'
          name='ville'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La ville est obligatoire',
            },
          ]}
        >
          <Input placeholder='ville' style={{ minWidth: 270 }} />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item label='Fax' name='fax' hasFeedback>
          <Input placeholder='fax' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item label='Email' name='email' hasFeedback>
          <Input placeholder='email' style={{ minWidth: 270 }} />
        </Form.Item>

        <Form.Item
          label="Directeur de l'insfracstucture"
          name='directeur'
          hasFeedback
          style={{ minWidth: 270 }}
        >
          <Select style={{ width: '100%' }} placeholder='directeur'>
            {personnel.map((pers) => (
              <Select.Option key={pers.id} value={pers.id}>
                {pers.nom}
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
