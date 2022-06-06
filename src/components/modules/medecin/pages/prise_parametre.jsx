/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';

export const PriseParametre = ({ quittance }) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [quittance, setQuittance] = useState(location?.state.quittance);
  const [parameters, setParameters] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [parameters]);

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
              parameters.splice(rowIndex, 1);
              setParameters(parameters);
              console.log(parameters);
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
      dataField: 'type',
      text: 'Paramètre',
      sort: true,
    },

    {
      dataField: 'valeur',
      text: 'Valeur',
      sort: true,
    },
    {
      dataField: 'commentaire',
      text: 'Commentaire',
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];

  return (
    <MedecinBaseLayout clicked={'patient'}>
      <Card title='Prise des paramètres du patient'>
        <div>
          <p>
            Nom du patient :{' '}
            <b style={{ fontSize: 16 }}>
              {quittance?.patient?.nom} {quittance?.patient?.prenom}
            </b>
          </p>
          <p>
            Age :{' '}
            <b style={{ fontSize: 16 }}>
              {getAge(quittance.patient.date_naissance)}
            </b>
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
            console.log(data);
            setIsLoading(true);
            let params = parameters;
            params.push(data);
            setParameters(params);
            form.resetFields();
            setIsLoading(false);
          }}
        >
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Type de parametre'
              name='type'
              style={{ minWidth: 200 }}
            >
              <Select style={{ width: '100%' }} placeholder='type de parametre'>
                <Select.Option value='poids'>Poids (kg)</Select.Option>
                <Select.Option value='temperature'>
                  Température °C
                </Select.Option>
                <Select.Option value='préssion'>Préssion</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Valeur' name='valeur' style={{ minWidth: 200 }}>
              <Input placeholder='valeur' type='number' />
            </Form.Item>
            <Form.Item
              label='Commentaire'
              name='commentaire'
              style={{ minWidth: 200 }}
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
            data={[...parameters]}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button type='primary' htmlType='submit' loading={isLoading}>
          Terminer la prise de paramètre
        </Button>
      </Card>
    </MedecinBaseLayout>
  );
};
