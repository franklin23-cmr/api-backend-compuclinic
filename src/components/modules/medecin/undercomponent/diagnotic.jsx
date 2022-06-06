/* eslint-disable no-unused-vars */
import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  notification,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { MALADIE } from '../../../shared/Enums';
import { Table } from '../../../shared/Table';
import {
  getAllDifferentiel,
  submitDifferentiels,
} from '../network/medecin.network';

export const Diagnotic = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [differentiels, setDifferentiels] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const { dossier } = consultation;
  const { patient } = dossier;

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [differentiels]);

  useEffect(() => {
    getAllDifferentiel(consultation.id).then((data) => {
      if (data?.result) {
        setDifferentiels(data?.result);
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
              differentiels.splice(rowIndex, 1);
              setDifferentiels(differentiels);
              console.log(differentiels);
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
      dataField: 'maladie',
      text: 'Maladie',
      sort: true,
    },

    {
      dataField: 'justificatif',
      text: 'Justificatif',
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
      <Card title='Diagnotics'>
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
            let params = differentiels;
            params.push(data);
            setDifferentiels(params);
            form.resetFields();
            setIsLoading(false);
          }}
        >
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Maladie (Soupçon)'
              name='maladie'
              style={{ minWidth: 300 }}
              rules={[
                {
                  required: true,
                  message: 'La maladie doit être précisée',
                },
              ]}
            >
              <AutoComplete
                style={{ width: 300 }}
                options={MALADIE}
                placeholder='localisation'
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
            <Form.Item
              label='Justificatif'
              name='justificatif'
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
            data={[...differentiels]}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button
          type='primary'
          onClick={async () => {
            setIsLoading(true);
            console.log(differentiels);
            for (let params of differentiels) {
              params.consultation = consultation.id;
            }
            submitDifferentiels(differentiels).then((data) => {
              if (data.result) {
                setIsLoading(false);
                notification.success({
                  message: 'Succès',
                  description: 'Les différentiels ont été enregistré',
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
