/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, notification, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import {
  getAllRecommandation,
  submitRecommandations,
} from '../network/medecin.network';

export const Recommandations = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommandations, setRecommandations] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');

  const { dossier } = consultation;
  const { patient } = dossier;

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [recommandations]);

  useEffect(() => {
    getAllRecommandation(consultation.id).then((data) => {
      if (data?.result) {
        setRecommandations(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const actionFormatter = (cell, row, rowIndex) => {
    return (
      <Space>
        <Button type='primary'>
          <FaPen size={13} />
        </Button>
        <Button
          type='primary'
          danger
          onClick={() => {
            const reload = async () => {
              setIsLoading(true);
              recommandations.splice(rowIndex, 1);
              setRecommandations(recommandations);
              console.log(recommandations);
            };
            reload().then(() => setIsLoading(false));
          }}
        >
          <FaTrash size={13} />
        </Button>
      </Space>
    );
  };

  const columns = [
    {
      dataField: 'label',
      text: 'Recommandations',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Descripiton',
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];

  return (
    <div>
      <Card title='Recommandations'>
        <div>
          <p>
            Nom du patient :{' '}
            <b style={{ fontSize: 16 }}>
              {patient.nom} {patient.prenom}
            </b>
          </p>
          <p>
            Age :{' '}
            <b style={{ fontSize: 16 }}>{getAge(patient.date_naissance)}</b>
          </p>
          <p>
            Date d'aujourd'hui :{' '}
            <b style={{ fontSize: 16 }}>{DateFr(new Date().toDateString())}</b>
          </p>
        </div>
        <hr style={{ backgroundColor: 'black' }} />
        <Form
          layout={formLayout}
          form={form}
          size='large'
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 25 }}
          initialValues={{}}
          scrollToFirstError
          onFinish={async (data) => {
            setIsLoading(true);
            let params = recommandations;
            params.push(data);
            setRecommandations(params);
            form.resetFields();
            setIsLoading(false);
          }}
        >
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Recommandation'
              name='label'
              rules={[
                {
                  required: true,
                  message: 'Le type doit être précisé',
                },
              ]}
              style={{ minWidth: 300 }}
            >
              <Input placeholder='récommandation' />
            </Form.Item>
            <Form.Item
              label='Description'
              name='description'
              rules={[
                {
                  required: true,
                  message: 'La Description doit être précisée',
                },
              ]}
              style={{ minWidth: 300 }}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
                style={{ marginTop: 45 }}
              >
                Ajouter
              </Button>
            </Form.Item>
          </Space>
        </Form>

        {!isLoading && (
          <Table
            isLoading={false}
            data={[...recommandations]}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button
          type='primary'
          onClick={async () => {
            setIsLoading(true);
            for (let params of recommandations) {
              params.consultation = consultation.id;
            }
            submitRecommandations(recommandations).then((data) => {
              setIsLoading(false);
              notification.success({
                message: 'Succès',
                description: 'Les recommandations ont été enregistré',
              });
            });
          }}
        >
          Terminer
        </Button>
      </Card>
    </div>
  );
};
