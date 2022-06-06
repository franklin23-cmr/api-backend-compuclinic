/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, notification, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Table } from '../../../shared/Table';
import {
  getAllMedicamment,
  submitMedicaments,
} from '../network/medecin.network';

export const Medicaments = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicaments, setMedicaments] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [medicaments]);

  useEffect(() => {
    getAllMedicamment(consultation.id).then((data) => {
      if (data?.result) {
        setMedicaments(data?.result);
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
              medicaments.splice(rowIndex, 1);
              setMedicaments(medicaments);
              console.log(medicaments);
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
      dataField: 'medicament',
      text: 'Médicament',
      sort: true,
    },

    {
      dataField: 'description',
      text: 'Description',
      sort: true,
    },
    {
      dataField: 'dose',
      text: 'Dose',
      sort: true,
    },
    {
      dataField: 'frequence',
      text: 'Fréquence',
      sort: true,
    },
    {
      dataField: 'duree',
      text: 'Durée',
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
      <Card title='Medicaments'>
        <Form
          layout={formLayout}
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 25 }}
          initialValues={{}}
          scrollToFirstError
          onFinish={async (data) => {
            setIsLoading(true);
            let params = medicaments;
            params.push(data);
            setMedicaments(params);
            form.resetFields();
            setIsLoading(false);
          }}
        >
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Médicament'
              name='medicament'
              rules={[
                {
                  required: true,
                  message: 'Le nom du medicament doit être précisée',
                },
              ]}
              style={{ minWidth: 300 }}
            >
              <Input placeholder='Nom' type='text' />
            </Form.Item>
            <Form.Item
              label='Dose'
              name='dose'
              rules={[
                {
                  required: true,
                  message: 'La dose doit être précisée',
                },
              ]}
              style={{ minWidth: 300 }}
            >
              <Input placeholder='valeur' type='number' />
            </Form.Item>
            <Form.Item
              label='Description'
              name='description'
              style={{ minWidth: 300 }}
            >
              <Input.TextArea />
            </Form.Item>
          </Space>
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Fréquence'
              name='frequence'
              rules={[
                {
                  required: true,
                  message: 'La frequence doit être précisée',
                },
              ]}
              style={{ minWidth: 300 }}
            >
              <Input placeholder='fréquence' type='number' />
            </Form.Item>
            <Form.Item
              label='Durée (jours)'
              name='duree'
              rules={[
                {
                  required: true,
                  message: 'La durée doit être précisée',
                },
              ]}
              style={{ minWidth: 300 }}
            >
              <Input placeholder='durée' type='number' />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
                style={{ marginTop: 30 }}
              >
                Ajouter
              </Button>
            </Form.Item>
          </Space>
        </Form>

        {!isLoading && (
          <Table
            isLoading={false}
            data={[...medicaments]}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button
          type='primary'
          onClick={async () => {
            setIsLoading(true);
            console.log(medicaments);
            for (let params of medicaments) {
              params.consultation = consultation.id;
            }
            submitMedicaments(medicaments).then((data) => {
              if (data.result) {
                setIsLoading(false);
                notification.success({
                  message: 'Succès',
                  description: 'Les médicaments ont été enregistré',
                });
              }
            });
          }}
        >
          Enregistrer
        </Button>
      </Card>
    </div>
  );
};
