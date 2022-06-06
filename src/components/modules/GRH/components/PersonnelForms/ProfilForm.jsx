/* eslint-disable no-unused-vars */
import { Button, Checkbox, Divider, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { submitProfil, updateProfil } from '../../network/grh.network';

export const ProfilForm = ({ personnel, groups, closeModal, updating }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{
        username: personnel?.user?.username,
        groups: personnel?.user?.groups,
      }}
      scrollToFirstError
      onFinish={async (data) => {
        let dataToPost = data;
        setIsLoading(true);
        dataToPost.personnel = personnel.id;
        console.log(dataToPost);
        if (personnel.user) {
          updateProfil(personnel.user.id, dataToPost).then((data) => {
            if (data?.result?.id) {
              notification.success({
                message: 'Succès',
                description: 'Le profil du personnel a été mise à jour',
              });
              closeModal();
            } else {
              notification.error({
                message: 'Erreur',
                description: 'Vérifiez les informations renseignées',
              });
            }
            setIsLoading(false);
          });
        } else {
          submitProfil(dataToPost).then((data) => {
            if (data?.result?.id) {
              notification.success({
                message: 'Succès',
                description: 'Le profil du personnel a été créé',
              });
              closeModal();
            } else {
              notification.error({
                message: 'Erreur',
                description: 'Vérifiez les informations renseignées',
              });
            }
            setIsLoading(false);
          });
        }
      }}
    >
      <Form.Item
        label='Username'
        name='username'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Le username de cet employé est obligatoire',
          },
        ]}
      >
        <Input placeholder='nom' />
      </Form.Item>
      {!updating && (
        <Form.Item
          label='Mot de passe'
          name='password'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Le prénom de cet employé est obligatoire',
            },
          ]}
        >
          <Input.Password placeholder='mot de passe' />
        </Form.Item>
      )}

      <Divider>Attribution des roles</Divider>

      <Form.Item
        label='Roles'
        name='groups'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Le matricule de cet employé est obligatoire',
          },
        ]}
      >
        <Checkbox.Group options={groups} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Créer le profil
        </Button>
      </Form.Item>
    </Form>
  );
};
