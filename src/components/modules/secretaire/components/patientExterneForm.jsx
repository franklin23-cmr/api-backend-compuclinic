/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
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
import {
  ANTECEDENTS,
  GROUP_SANGUIN,
  RELIGIONS,
  SEXE,
} from '../../../shared/Enums';
import { submitPatient, updatePatient } from '../network/secretaire.network';

export const PatientExterneForm = ({
  isLoading,
  setIsLoading,
  dataInForm,
  submitButtonText,
}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [listAntecedent, setListAntecedent] = useState([]);
  const history = useHistory();

  return (
    <Form
      layout={formLayout}
      form={form}
      size='large'
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={dataInForm}
      scrollToFirstError
      onFinish={async (data) => {
        let dataToPost = data;
        dataToPost['date_naissance'] =
          dataToPost['date_naissance'].format('YYYY-MM-DD');
        dataToPost.antecedent = listAntecedent.join('\n');
        setIsLoading(true);
        if (dataInForm) {
          console.log(data);
          data = { ...data, id: dataInForm.id };
          dataInForm = { ...dataInForm, data };
          updatePatient(dataInForm.id, data)
            .then((result) => {
              setIsLoading(false);
              if (result?.success || result?.id) {
                notification.success({
                  message: 'Succès',
                  description:
                    'Les informations du patients on été mise à jour',
                });
                history.push('/secretaire/liste-patients');
              } else {
                notification.error({
                  message: 'Erreur de connection',
                  description: 'Vérifier vos informations de connexion',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log(dataToPost);
          submitPatient(dataToPost).then((result) => {
            console.log(result);
            setIsLoading(false);
            if (result?.success || result?.result.id) {
              notification.success({
                message: 'Succès',
                description: 'La patient externe a été crée avec succès',
              });
              history.push('/secretaire/liste-patients');
            } else {
              notification.error({
                message: 'Erreur de connection',
                description: 'Vérifier vos informations de connexion',
              });
            }
          });
        }
      }}
    >
      <div className='form-subtitle'>
        <p>Infos Personnelles</p>
      </div>
      <Space size={20}>
        <Form.Item
          label='Nom'
          name='nom'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le nom du patient est obligatoire',
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
              message: 'Le prénom du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='prénom' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Sexe'
          name='sexe'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le sexe du patient est obligatoire',
            },
          ]}
          style={{ minWidth: 300 }}
        >
          <Select style={{ width: '100%' }} placeholder='sexe'>
            {SEXE.map((sexe) => (
              <Select.Option key={sexe.value} value={sexe.value}>
                {sexe.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Téléphone'
          name='telephone'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le contact du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='téléphone' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Domicile'
          name='domicile'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le domicile du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='domicile' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Nationalite'
          name='nationalite'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La nationalité du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='nationalite' style={{ minWidth: 300 }} />
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
              message: 'Le lieu de naissance du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='lieu de naissance' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item label='Numéro de CNI' name='CNI' hasFeedback>
          <Input placeholder='CNI' style={{ minWidth: 300 }} />
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
          <DatePicker
            disabledDate={(current) => current > moment().endOf('day')}
            style={{ minWidth: 300 }}
          />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Proféssion'
          name='profession'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La proféssion du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='proféssion' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Lieu de Travail'
          name='lieu_travail'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le lieu de travail du patient est obligatoire',
            },
          ]}
        >
          <Input placeholder='lieu de travail' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Téléphone Lieu Travail Patient'
          name='telephone_lieu_travail'
          hasFeedback
        >
          <Input
            placeholder='téléphone lieu travail patient'
            style={{ minWidth: 300 }}
          />
        </Form.Item>
      </Space>

      <Space size={20}>
        <Form.Item
          label='Réligion'
          name='religion'
          hasFeedback
          style={{ minWidth: 300 }}
        >
          <Select style={{ width: '100%' }} placeholder='religion'>
            {RELIGIONS.map((religion) => (
              <Select.Option key={religion.value} value={religion.value}>
                {religion.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='Groupe Ethnique' name='ethnie' hasFeedback>
          <Input placeholder='ethnie' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Group sanguin'
          name='group_sanguin'
          hasFeedback
          style={{ minWidth: 300 }}
        >
          <Select style={{ width: '100%' }} placeholder='group sanguin'>
            {GROUP_SANGUIN.map((group) => (
              <Select.Option key={group.value} value={group.value}>
                {group.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Space>

      <div className='form-subtitle'>
        <p>Antécédents</p>
      </div>
      <Form.Item label='Antécédents Familiaux' name='antecedent'>
        <Checkbox.Group
          options={ANTECEDENTS}
          onChange={(antecedents) => setListAntecedent(antecedents)}
        />
      </Form.Item>

      <div className='form-subtitle'>
        <p>Autres Infos</p>
      </div>

      <Space size={20}>
        <Form.Item label='Nom du Garant' name='nom_garant' hasFeedback>
          <Input placeholder='nom du garant' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item label='Prénom du Garant' name='prenom_garant' hasFeedback>
          <Input placeholder='prénom du garant' style={{ minWidth: 300 }} />
        </Form.Item>

        <Form.Item
          label='Téléphone du Garant'
          name='telephone_garant'
          hasFeedback
        >
          <Input placeholder='téléphone du garant' style={{ minWidth: 300 }} />
        </Form.Item>
      </Space>
      <Space size={20}>
        <Form.Item label='Adresse du Garant' name='adresse_garant' hasFeedback>
          <Input placeholder='adresse du garant' style={{ minWidth: 300 }} />
        </Form.Item>
        <Form.Item
          label='Proféssion Garant'
          name='profession_garant'
          hasFeedback
        >
          <Input placeholder='proféssion du garant' style={{ minWidth: 300 }} />
        </Form.Item>
        <Form.Item
          label='Lieu de travail du garant'
          name='lieu_travail_garant'
          hasFeedback
        >
          <Input
            placeholder='lieu de travail du garant'
            style={{ minWidth: 300 }}
          />
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
