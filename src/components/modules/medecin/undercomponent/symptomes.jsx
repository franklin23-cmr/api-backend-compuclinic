/* eslint-disable no-unused-vars */
import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  notification,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { BODY_LOCALISATION } from '../../../shared/Enums';
import { Table } from '../../../shared/Table';
import { getAllSymp, submitSymptomes } from '../network/medecin.network';

export const Symptomes = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [symptomes, setSymptomes] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const { dossier } = consultation;
  const { patient } = dossier;

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [symptomes]);

  useEffect(() => {
    getAllSymp(consultation.id).then((data) => {
      if (data?.result) {
        setSymptomes(data?.result);
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
              symptomes.splice(rowIndex, 1);
              setSymptomes(symptomes);
              console.log(symptomes);
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
      dataField: 'nom',
      text: 'Nom',
      sort: true,
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
    },
    {
      dataField: 'intensité',
      text: 'Sévérité /10',
      sort: true,
    },
    {
      dataField: 'localisation',
      text: 'Localisation',
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
      <Card title='Symptomes'>
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
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 25 }}
          initialValues={{}}
          scrollToFirstError
          onFinish={async (data) => {
            setIsLoading(true);
            let params = symptomes;
            params.push(data);
            setSymptomes(params);
            form.resetFields();
            setIsLoading(false);
          }}
        >
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item label='Nom' name='nom' style={{ minWidth: 300 }}>
              <Input placeholder='nom' type='text' />
            </Form.Item>
            <Form.Item label='Type' name='type' style={{ minWidth: 300 }}>
              <Select style={{ width: '100%' }} placeholder='type de symptomes'>
                <Select.Option value='A'>Type A</Select.Option>
                <Select.Option value='B'>Type B</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label='Description'
              name='description'
              style={{ minWidth: 350 }}
            >
              <Input.TextArea />
            </Form.Item>
          </Space>
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Severité /10'
              name='intensité'
              style={{ minWidth: 300 }}
            >
              <Input placeholder='valeur' type='number' />
            </Form.Item>
            <Form.Item
              label='Localisation'
              name='localisation'
              style={{ minWidth: 300 }}
              valeur='emplacement'
            >
              <AutoComplete
                style={{ width: 300 }}
                options={BODY_LOCALISATION}
                placeholder='localisation'
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
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
            data={[...symptomes]}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button
          type='primary'
          onClick={async () => {
            setIsLoading(true);
            console.log(symptomes);
            for (let params of symptomes) {
              params.consultation = consultation.id;
            }
            submitSymptomes(symptomes).then((data) => {
              if (data?.result) {
                setIsLoading(false);
                notification.success({
                  message: 'Succès',
                  description: 'Les symptomes ont été enregistré',
                });
              }
            });
          }}
        >
          Terminer
        </Button>
      </Card>
    </div>
  );
};
