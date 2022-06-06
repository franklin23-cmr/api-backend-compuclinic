/* eslint-disable no-unused-vars */
import { Button, DatePicker, Form, Input, notification } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitTiaps } from '../network/caissier.network';

export const TiapsForm = ({ closeModal, quittance, medecin }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{
        quittance: quittance.numero,
        medecin: `${medecin.nom} ${medecin.prenom}`,
      }}
      scrollToFirstError
      onFinish={async (data) => {
        let dataToPost = {};
        dataToPost.quittance = quittance.id;
        if (quittance.prestation === 'Q-EXAM') {
          dataToPost.laborantin = medecin.id;
        } else {
          dataToPost.medecin = medecin.id;
        }
        dataToPost.date_consultation =
          data.date_consultation.format('YYYY-MM-DD');
        dataToPost.heure_debut = data.horaire_consultation[0].format('HH:mm');
        dataToPost.heure_fin = data.horaire_consultation[1].format('HH:mm');

        console.log('---------------->', medecin.nom);
        setIsLoading(true);
        submitTiaps(dataToPost)
          .then((data) => {
            if (data.result.id) {
              notification.success({
                message: 'Succès',
                description: 'La tiaps a été créé',
              });
              console.log('---------------->', data, '<----------------');
              setIsLoading(false);
              closeModal();
              history.push('/caissier/tiaps');
            } else {
              notification.error({
                message: 'Erreur',
                description: "La tiaps n'a pas été créé",
              });
              setIsLoading(false);
            }
          })
          .catch((e) => console.log(e));
      }}
    >
      <> {console.log('-------------[', medecin, ']------------------')}</>
      <Form.Item label='Numéro de Quittance' name='quittance' hasFeedback>
        <Input placeholder='quittance' disabled />
      </Form.Item>
      <Form.Item label='Médecin' name='medecin' hasFeedback>
        <Input placeholder='medecin' disabled />
      </Form.Item>
      <Form.Item
        label='Date de Consultation'
        name='date_consultation'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selectionnez la date de consultation',
          },
        ]}
      >
        <DatePicker
          disabledDate={(current) => current < moment().startOf('day')}
          style={{ minWidth: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label='Horaire de Consultation'
        name='horaire_consultation'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selectionnez les horaires de consultation',
          },
        ]}
      >
        <DatePicker.RangePicker
          picker='time'
          defaultValue={[
            moment(new Date(), 'HH:mm'),
            moment(new Date(), 'HH:mm'),
          ]}
          format={['HH:mm', 'HH:mm']}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Terminer
        </Button>
      </Form.Item>
    </Form>
  );
};
