/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  notification,
  Select,
  Space,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDiff } from '../../../../shared/DateToFrench';
import {
  submitStage,
  submitStagiaire,
  updateStagiaire,
} from '../../network/grh.network';

export const StagiaireForm = ({
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
        dataToPost['date_debut'] =
          dataToPost['date_debut']?.format('YYYY-MM-DD');
        dataToPost['date_fin'] = dataToPost['date_fin']?.format('YYYY-MM-DD');
        if (dataToPost.est_remunere === undefined) {
          dataToPost.est_remunere = false;
        }
        setIsLoading?.(true);

        if (dataInForm) {
          console.log(data);
          data = { ...data, id: dataInForm.id };
          dataInForm = { ...dataInForm, data };
          updateStagiaire(dataInForm.id, data)
            .then((result) => {
              setIsLoading?.(false);
              if (result?.success || result?.result.id) {
                notification.success({
                  message: 'Succès',
                  description: 'Le stagiaire a été modifié avec succès',
                });
                history.push('/grh/personnel', { tabIndex: '6' });
              } else {
                notification.error({
                  message: 'Erreur de connection',
                  description: 'Vérifier les informations renseigné',
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          submitStagiaire(dataToPost)
            .then((result) => {
              console.log(result);
              if (result?.result?.id) {
                const stage = {
                  est_remunere: dataToPost.est_remunere,
                  date_debut: dataToPost.date_debut,
                  date_fin: dataToPost.date_fin,
                  stagiaire: result.result.id,
                  theme: dataToPost.theme,
                  ecole: dataToPost.ecole,
                  duree: getDiff(dataToPost.date_debut, dataToPost.date_fin),
                };
                console.log(stage);
                submitStage(stage).then((stageResult) => {
                  console.log(stageResult);
                  if (stageResult?.success) {
                    setIsLoading(false);
                    notification.success({
                      message: 'Succès',
                      description: 'Stagiaire créé avec succès',
                    });
                    history.push('/grh/personnel', { tabIndex: '6' });
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
          label='Nationalité'
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

        <Form.Item
          label='Niveau'
          name='niveau'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Niveau obligatoire',
            },
          ]}
          style={{ minWidth: 300 }}
        >
          <Select style={{ width: '100%' }} placeholder='Niveau'>
            <Select.Option value='BEPC'>BEPC.</Select.Option>
            <Select.Option value='BAC'>BAC</Select.Option>
            <Select.Option value='BAC+1'>BAC+1</Select.Option>
            <Select.Option value='BAC+2'>BAC+2</Select.Option>
            <Select.Option value='BAC+3'>BAC+3</Select.Option>
            <Select.Option value='BAC+4'>BAC+4</Select.Option>
            <Select.Option value='BAC+5'>BAC+5</Select.Option>
            <Select.Option value='BAC+6'>BAC+6</Select.Option>
            <Select.Option value='BAC+7'>BAC+7</Select.Option>
          </Select>
        </Form.Item>
      </Space>
      {!dataInForm && (
        <>
          <Divider>
            <span style={{ color: '#1890ff', fontSize: 20 }}>
              Informations de stages
            </span>
          </Divider>

          <Space size={20}>
            <Form.Item
              label='Date de Début'
              name='date_debut'
              hasFeedback
              rules={[
                {
                  required: true,
                  type: 'object',
                  message: 'Selectionnez la date de début de stage',
                },
              ]}
            >
              <DatePicker style={{ minWidth: 300 }} />
            </Form.Item>
            <Form.Item
              label='Date de Fin'
              name='date_fin'
              hasFeedback
              rules={[
                {
                  required: true,
                  type: 'object',
                  message: 'Selectionnez la date de fin de stage',
                },
              ]}
            >
              <DatePicker style={{ minWidth: 300 }} />
            </Form.Item>
            <Form.Item
              label='Rémunéré'
              name='est_remunere'
              valuePropName='checked'
            >
              <Checkbox>Est rémunéré</Checkbox>
            </Form.Item>
          </Space>

          <Space size={20}>
            <Form.Item
              label='Université'
              name='ecole'
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "L'université du stagiaire est obligatoire",
                },
              ]}
            >
              <Input placeholder='université' style={{ minWidth: 500 }} />
            </Form.Item>
            <Form.Item label='Theme de stage' name='theme' hasFeedback>
              <Input placeholder='theme de stage' style={{ minWidth: 500 }} />
            </Form.Item>
          </Space>
        </>
      )}

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          {submitButtonText || "Terminer l'Inscription"}
        </Button>
      </Form.Item>
    </Form>
  );
};
