/* eslint-disable no-unused-vars */
import {
  AutoComplete,
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
import { SPECIALITE } from '../../../../shared/Enums';
import {
  submitMedecin,
  submitProfilSpecialiste,
  updateMedecin,
} from '../../network/grh.network';

export const MedecinForm = ({
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
        date_naissance: moment(dataInForm?.date_naissance, 'YYYY-MM-DD'),
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
        dataToPost['date_obtention'] =
          dataToPost['date_obtention']?.format('YYYY-MM-DD');
        setIsLoading?.(true);

        if (dataInForm) {
          data = { ...dataToPost, id: dataInForm?.id };
          console.log(data);
          updateMedecin(dataInForm?.id, data)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description: 'La mise à jour du medecin a réussie',
                });
                history.push('/grh/personnel', { tabIndex: '1' });
              } else {
                notification.error({
                  message: 'Echec de mise à jour',
                  description: 'Vérifier les informations renseigné',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitMedecin(dataToPost)
            .then((result) => {
              console.log(result);
              setIsLoading(false);
              if (result?.success || result?.result?.id) {
                const profil = {
                  specialite: dataToPost.specialite,
                  medecin: result.result.id,
                  date_obtention: dataToPost.date_obtention,
                };
                submitProfilSpecialiste(profil).then((result) => {
                  if (result?.success) {
                    setIsLoading(false);
                    notification.success({
                      message: 'Succès',
                      description: 'Le Médecin a été crée avec succès',
                    });
                    history.push('/grh/personnel', { tabIndex: '1' });
                  }
                });
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
          label='Type'
          name='type'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le type de ce médecin employé est obligatoire',
            },
          ]}
          style={{ minWidth: 300 }}
        >
          <Select style={{ width: '100%' }} placeholder='type'>
            <Select.Option value='S'>Spécialiste</Select.Option>
            <Select.Option value='G'>Généraliste</Select.Option>
          </Select>
        </Form.Item>
      </Space>

      <Space size={20}>
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
              message: 'La date de naissance est obligatoire',
            },
          ]}
        >
          <DatePicker style={{ minWidth: 300 }} />
        </Form.Item>
      </Space>

      <Space size={20}>
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
      {!dataInForm && (
        <Space size={20}>
          <Form.Item
            label='Spécialité'
            name='specialite'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'La spécialité du médecin spécialiste est obligatoire',
              },
            ]}
          >
            <AutoComplete
              style={{ width: 300 }}
              options={SPECIALITE}
              placeholder='spécialité'
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </Form.Item>
          <Form.Item
            label="Date d'obtention du diplôme"
            name='date_obtention'
            hasFeedback
            rules={[
              {
                required: true,
                type: 'object',
                message: "La date d'obtention est obligatoire",
              },
            ]}
          >
            <DatePicker style={{ minWidth: 300 }} />
          </Form.Item>
        </Space>
      )}

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          {submitButtonText || "Terminer l'Inscription"}
        </Button>
      </Form.Item>
    </Form>
  );
};
