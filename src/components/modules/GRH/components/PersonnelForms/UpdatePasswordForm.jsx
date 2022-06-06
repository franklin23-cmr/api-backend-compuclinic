/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../../../redux/userStore/actions';
import { updatePassword } from '../../network/grh.network';

export const UpdatePasswordForm = ({ personnelId, closeModal }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const connectedUser = useSelector((state) => state.userReducer).user;

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{}}
      scrollToFirstError
      onFinish={async (data) => {
        let dataToPost = data;
        setIsLoading(true);
        updatePassword(personnelId, dataToPost).then((data) => {
          if (data?.result) {
            dispatch(
              createUser({ ...connectedUser, should_update_password: false }),
            );
            notification.success({
              message: 'Succès',
              description: 'Votre mot de passe a été mise à jour avec succès',
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
      }}
    >
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

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Mettre à jour
        </Button>
      </Form.Item>
    </Form>
  );
};
