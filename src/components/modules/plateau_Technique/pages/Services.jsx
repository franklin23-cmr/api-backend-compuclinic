import { Button, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import building from '../../../../assets/images/building.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import { PlateauBaseLayout } from '../components/plateauBasedLayout';
import { getServices } from '../network/plateauTechnique.network';

export const Services = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getServices().then((data) => {
      if (data) {
        setServices(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const actionFormatter = (cell, row) => {
    return (
      <Space>
        <Tooltip title='modifier Infrastructure'>
          <ButtonWithModal
            buttonText={<FaPen size={13} color='white' />}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Modification Services</span>
              ),
              width: 650,
            }}
            buttonProps={{ style: { backgroundColor: '#ff8619' } }}
          >
            {(closeModal) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img
                  src={building}
                  alt=''
                  style={{ width: 350, height: 350 }}
                />
                <div>
                  <h5 style={{ textAlign: 'center' }}>
                    Voulez vous modifier les informations du service ?
                  </h5>
                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  >
                    {row.nom}
                  </p>
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link
                      to={{
                        pathname: '/plateau/enregistrement',
                        state: { service: row, tabIndex: '6' },
                      }}
                      onClick={() => closeModal()}
                    >
                      <Button type='primary'>Oui</Button>
                    </Link>
                    <Button onClick={() => closeModal()} type='primary' danger>
                      Non
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </ButtonWithModal>
        </Tooltip>
      </Space>
    );
  };
  const columns = [
    {
      dataField: 'nom',
      text: 'Nom du Service',
      sort: true,
    },

    {
      dataField: 'chef.nom',
      text: 'Chef du Service',
      sort: true,
    },
    {
      dataField: 'chef.matricule',
      text: 'Matricule du responsable',
      sort: true,
    },
    {
      dataField: 'chef.type_personnel',
      text: 'Type du Personnel',
      sort: true,
    },
    {
      dataField: 'batiment.nom',
      text: 'Batiment',
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: actionFormatter,
    },
  ];
  return (
    <PlateauBaseLayout clicked={'services'}>
      {' '}
      <Table
        columns={columns}
        data={services}
        isLoading={isLoading}
        onSelect={(row, rowIndex) => setIsLoading(row)}
      />
    </PlateauBaseLayout>
  );
};
