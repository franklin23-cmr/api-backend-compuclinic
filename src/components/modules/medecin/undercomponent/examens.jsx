/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import { submitPatient } from '../../secretaire/network/secretaire.network';
import { getAllExamens } from '../network/medecin.network';
export const Examens = ({ consultation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [examens, setExamens] = useState([]);
  const [examenToCashier, setExamenToCashier] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');

  const { dossier } = consultation;
  const { patient } = dossier;
  console.log('liste de tous les examens du medecin ', consultation);
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [examens]);

  useEffect(() => {
    getAllExamens(consultation.id).then((data) => {
      if (data?.result) {
        setExamens(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const actionFormatter = (cell, row, rowIndex) => {
    return (
      <Space>
        {console.log('row index', rowIndex)}
        <Button type='primary'>
          <FaPen size={13} />
        </Button>
        <Button
          type='primary'
          danger
          onClick={() => {
            const reload = async () => {
              setIsLoading(true);
              examens.splice(rowIndex, 1);
              setExamens(examens);
              console.log(examens);
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
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];

  return (
    <div>
      <Card title='Examens'>
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
            let params = examens;
            params.push(data);
            setExamens(params);
            form.resetFields();
            setIsLoading(false);
          }}
        >
          <Space size={50} style={{ width: '100%' }}>
            <Form.Item
              label='Nom'
              name='label'
              rules={[
                {
                  required: true,
                  message: "La nom de l'examen doit être précisée",
                },
              ]}
              style={{ minWidth: 350 }}
            >
              <Input placeholder='nom' type='text' />
            </Form.Item>
            <Form.Item
              label='Type'
              name='type'
              style={{ minWidth: 350 }}
              rules={[
                {
                  required: true,
                  message: "La type de l'examen doit être précisée",
                },
              ]}
            >
              <Select style={{ width: '100%' }} placeholder="type d'examens">
                <Select.Option value=' Amniocentèse'>
                  Amniocentèse
                </Select.Option>
                <Select.Option value=' Angiographie pulmonaire'>
                  Angiographie pulmonaire
                </Select.Option>
                <Select.Option value='Antibiogramme'>
                  Antibiogramme
                </Select.Option>
                <Select.Option value='Artériographie'>
                  Artériographie
                </Select.Option>
                <Select.Option value='Audiométrie'>Audiométrie</Select.Option>
                <Select.Option value='Bilan sanguin.'>
                  Bilan sanguin.
                </Select.Option>
                <Select.Option value='Echographie'>Echographie</Select.Option>

                <Select.Option value='echo'></Select.Option>
              </Select>
            </Form.Item>
          </Space>

          <Space size={30} style={{ width: '100%' }}>
            <Form.Item
              label='Description'
              name='description'
              style={{ minWidth: 400 }}
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
            data={[...examens]}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
          />
        )}

        <Button
          type='primary'
          onClick={async () => {
            setIsLoading(true);
            console.log(' ------------------------------> ', examens);
            for (let params of examens) {
              params.consultation = consultation.id;
            }
            // submitExamens(examens).then((data) => {
            //   setIsLoading(false);
            //   notification.success({
            //     message: 'Succès',
            //     description: 'Les examens prescris ont été enregistré',
            //   });
            // });
            console.log('------------>', examens);

            submitPatient(consultation.dossier.patient).then((data) => {
              setIsLoading(false);
              notification.success({
                message: 'Succès',
                description: 'medecins/examens/',
              });
            });
          }}
        >
          Enregistrer
        </Button>
      </Card>
    </div>
  );
};
