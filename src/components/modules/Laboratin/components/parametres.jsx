/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAge } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import {
  getListeParametres_exam,
  submitParameters_exam,
} from '../network/laborantin.network';

export const Parametres = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parameters, setParameters] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const connectedUser = useSelector((state) => state.userReducer).user;

  const history = useHistory();
  console.log('1111111111', consultation);
  const dossier = consultation.consultation.dossier;
  console.log('dossier', dossier);
  const patient = dossier.patient;

  useEffect(() => {
    getListeParametres_exam(connectedUser.id).then((data) => {
      if (data?.result) {
        setParameters(data?.result);
        setIsLoading(false);
        console.log('asasasasas', data?.result);
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
      dataField: 'type_prelevement',
      text: 'Type prelevement',
      sort: true,
    },
    {
      dataField: 'resultat',
      text: 'resultat',
      sort: true,
    },
    {
      dataField: 'Conclusion',
      text: 'avis definitif',
      sort: true,
    },
    // {
    //   dataField: 'date_prelevement',
    //   text: 'Date de Prise',
    //   sort: true,
    //   formatter: dateFormatter,
    // },
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
              {patient.nom}- {patient.prenom}
            </b>
          </p>
          <p>
            Age :{' '}
            <b style={{ fontSize: 16 }}>{getAge(patient.date_naissance)}</b>
          </p>

          <p>
            numero: <b style={{ fontSize: 16 }}>{patient.telephone}</b>
          </p>

          <p>
            Date d'aujourd'hui :{' '}
            <b style={{ fontSize: 16 }}>{new Date().toDateString()}</b>
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
              label='Type de prelevement'
              name='type_prelevement'
              style={{ minWidth: 200 }}
            >
              <Select
                style={{ width: '100%' }}
                placeholder='type de prelevement'
              >
                <Select.Option value='Nasopharynge'>Nasopharynge</Select.Option>
                <Select.Option value='autre'> autre</Select.Option>
                {/* <Select.Option value='temperature'>
                  Température °C
                </Select.Option>
                <Select.Option value='préssion'>Préssion</Select.Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              label='resultat'
              name='resultat'
              style={{ minWidth: 200 }}
            >
              <Select style={{ width: '100%' }} placeholder='resultat'>
                <Select.Option value='Presence de SARS Cov Ag'>
                  presence du SARS Cov'Ag
                </Select.Option>
                <Select.Option value='Absence de SARS Cov Ag'>
                  abscence du SARS Cov'Ag
                </Select.Option>
                <Select.Option value='indetermine'> indetermine </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='avis definitif'
              name='Conclusion'
              style={{ minWidth: 200 }}
            >
              <Input.TextArea />
            </Form.Item>
            {/* 
            <Form.Item
              label='date_prelevement'
              name='date_prelevement'
              style={{ minWidth: 200 }}
            >
              DateFr(new Date().toDateString())
            </Form.Item> */}

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
                style={{ marginTop: 45 }}
              >
                Ajouter
              </Button>
              {console.log('parametre', parameters)}
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
            console.log('parametre', parameters);
            for (let params of parameters) {
              params.consultation = consultation.consultation.id;
              console.log(
                'sdfsdfsdf',
                consultation.consultation.id,
                consultation.laborantin.id,
              );
              params.laborantin = consultation.laborantin.id;
              params.prescription = consultation.prescription.id;
              await submitParameters_exam(params).then((data) =>
                console.log('*******************', data),
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
