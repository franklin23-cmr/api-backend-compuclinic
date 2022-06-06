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
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitCaissiere, updateCaissier } from '../../network/grh.network';

export const CaissierForm = ({
  isLoading,
  setIsLoading,
  dataInForm,
  submitButtonText,
}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();

  const newDataInForm = dataInForm
    ? {
        ...dataInForm,
        date_naissance: moment(dataInForm.date_naissance, 'YYYY-MM-DD'),
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
        dataToPost['date_naissance'] =
          dataToPost['date_naissance'].format('YYYY-MM-DD');
        setIsLoading?.(true);

        if (dataInForm) {
          console.log(data);
          data = { ...data, id: dataInForm.id };
          dataInForm = { ...dataInForm, data };
          updateCaissier(dataInForm.id, data)
            .then((result) => {
              setIsLoading?.(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Caissier modifié avec succès',
                });
                history.push('/grh/personnel', { tabIndex: '3' });
              } else {
                notification.error({
                  message: 'Erreur de connection',
                  description: 'Vérifier les informations renseigné',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitCaissiere(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success) {
                notification.success({
                  message: 'Succès',
                  description: 'Caissier créé avec succès',
                });
                history.push('/grh/personnel', { tabIndex: '3' });
              } else {
                notification.error({
                  message: 'Erreur de connection',
                  description: 'Vérifier les informations renseigné',
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
              message: 'Le nom de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='nom' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Prénom'
          name='prenom'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le prénom de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='prénom' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Matricule'
          name='matricule'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le matricule de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='matricule' style={{ minWidth: 300 }} />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Etat Civil'
          name='etat_civil'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Etat civil obligatoire',
            },
          ]}
          style={{ minWidth: 300 }}
        >
          <Select style={{ width: '100%' }} placeholder='etat civil'>
            <Select.Option value='MR'>M.</Select.Option>
            <Select.Option value='MME'>Mme</Select.Option>
            <Select.Option value='MLLE'>Mlle</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Date de Naissance'
          name='date_naissance'
          hasFeedback
          rules={[
            {
              required: true,
              type: 'object',
              message: 'Selectionnez la date de naissance',
            },
          ]}
        >
          <DatePicker style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Lieu de Naissance'
          name='lieu_naissance'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le lieu de naissance de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='lieu de naissance' style={{ minWidth: 300 }} />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Numéro de CNI'
          name='CNI'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le numéro de CNI de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='CNI' style={{ minWidth: 300 }} />
        </Form.Item>

        {/* <Form.Item label='Poste' name='poste' hasFeedback>
          <Input placeholder='poste' style={{ minWidth: 300 }} />
        </Form.Item> */}

        <Form.Item
          label='Email'
          name='email'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Email obligatoire',
            },
          ]}
        >
          <Input placeholder='email' style={{ minWidth: 300 }} />
        </Form.Item>
        <Form.Item
          label='Téléphone'
          name='telephone'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le contact du médecin est obligatoire',
            },
          ]}
        >
          <Input placeholder='téléphone' style={{ minWidth: 300 }} />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Nationalite'
          name='nationalite'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La nationalité de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='nationalite' style={{ minWidth: 300 }} />
        </Form.Item>
        <Form.Item
          label='Domicile'
          name='domicile'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le domicile de cet employé est obligatoire',
            },
          ]}
        >
          <Input placeholder='domicile' style={{ minWidth: 300 }} />
        </Form.Item>
      </Space>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          {submitButtonText || "Terminer l'Inscription"}
        </Button>
      </Form.Item>
    </Form>
  );
};
