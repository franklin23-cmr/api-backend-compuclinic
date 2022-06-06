import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import building from '../../../../../../assets/images/building.svg';
import { ButtonWithModal } from '../../../../../shared/ButtonWithModal';
import { Table } from '../../../../../shared/Table';
import { dateFormatter } from '../../../../../shared/Table/cellFormatter';
import { getLits } from '../../../network/plateauTechnique.network';

export const LitTable = ({ bySecretaire }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lits, setLits] = useState([]);

  useEffect(() => {
    getLits().then((data) => {
      setLits(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table
        isLoading={isLoading}
        data={lits}
        columns={
          bySecretaire
            ? columns.filter((col) => col.dataField !== 'action')
            : columns
        }
      />
    </div>
  );
};
const actionFormatter = (cell, row) => {
  return (
    <Space>
      <Tooltip title='modifier le lit'>
        <ButtonWithModal
          buttonText={<FaPen size={13} color='white' />}
          modalProps={{
            title: (
              <span style={{ color: 'white' }}>
                Modifier les informations du lit
              </span>
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
              <img src={building} alt='' style={{ width: 350, height: 350 }} />
              <div>
                <h5 style={{ textAlign: 'center' }}>
                  Voulez vous modifier les informations du lit ?
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
                      state: { lit: row, tabIndex: '4' },
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
    dataField: 'numero',
    text: 'Numéro Du lit',
    sort: true,
  },
  {
    dataField: 'numero_serie',
    text: 'Numéro de Série',
    sort: true,
  },
  {
    dataField: 'local.nom',
    text: 'Local',
    sort: true,
  },
  {
    dataField: 'date_enregistrement',
    text: "Date d'arrivé",
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'local.batiment.nom',
    text: 'Batiment',
    sort: true,
  },
  {
    dataField: 'est_libre',
    text: 'Libre',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
