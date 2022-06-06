/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import {
  getListeParametres,
  submitParameters_exeam,
} from '../network/medecin.network';

export const Parametres = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parameters, setParameters] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const connectedUser = useSelector((state) => state.userReducer).user;

  const history = useHistory();
  const { dossier } = consultation;
  const { patient } = dossier;

  useEffect(() => {
    getListeParametres(consultation.id).then((data) => {
      if (data?.result) {
        setParameters(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

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
      text: 'Type de Paramètres',
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
      dataField: 'date_prise',
      text: 'Date de Prise',
      sort: true,
      formatter: dateFormatter,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];

  return (
    <div>
      <Card title='Prise des paramètres du patient'>
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
                <Select.Option value='Taille'>Taille (cm)</Select.Option>
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
            columns={columns}
            data={parameters}
            isLoading={isLoading}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button
          type='primary'
          onClick={async () => {
            setIsLoading(true);
            console.log(parameters);
            for (let params of parameters) {
              params.auteur = connectedUser.id;
              await submitParameters_exeam(params).then((data) =>
                console.log('2222', data),
              );
            }
            setIsLoading(false);
            notification.success({
              message: 'Succès',
              description: 'Les paramètres ont été enregistré',
            });
            //history.push('/medecin/consultations');
          }}
        >
          Modifier la prise de paramètre
        </Button>
      </Card>
    </div>
  );
};
