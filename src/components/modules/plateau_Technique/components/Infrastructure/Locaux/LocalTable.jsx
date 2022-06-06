import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import building from '../../../../../../assets/images/building.svg';
import { ButtonWithModal } from '../../../../../shared/ButtonWithModal';
import { Table } from '../../../../../shared/Table';
import { getLocaux } from '../../../network/plateauTechnique.network';

export const LocalTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locaux, setLocaux] = useState([]);

  useEffect(() => {
    getLocaux().then((data) => {
      setLocaux(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table isLoading={isLoading} data={locaux} columns={columns} />
    </div>
  );
};
const actionFormatter = (cell, row) => {
  return (
    <Space>
      <Tooltip title='modifier local'>
        <ButtonWithModal
          buttonText={<FaPen size={13} color='white' />}
          modalProps={{
            title: (
              <span style={{ color: 'white' }}>
                Modifier les informations du local
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
                  Voulez vous modifier les informations du local ?
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
                      state: { local: row, tabIndex: '2' },
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
    text: 'Nom',
    sort: true,
  },
  {
    dataField: 'localisation',
    text: 'Localisation',
    sort: true,
  },
  {
    dataField: 'supericie',
    text: 'Dimension',
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
