import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import building from '../../../../../../assets/images/building.svg';
import { ButtonWithModal } from '../../../../../shared/ButtonWithModal';
import { Table } from '../../../../../shared/Table';
import { getMateriel } from '../../../network/plateauTechnique.network';

export const MaterielTable = ({ bySecretaire }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [materiels, setMateriels] = useState([]);

  useEffect(() => {
    getMateriel().then((data) => {
      setMateriels(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table
        isLoading={isLoading}
        data={materiels}
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
      <Tooltip title='modifier matériel'>
        <ButtonWithModal
          buttonText={<FaPen size={13} color='white' />}
          modalProps={{
            title: (
              <span style={{ color: 'white' }}>
                Modifier les informations du matériel
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
                  Voulez vous modifier les informations du matériel ?
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
                      state: { materiel: row, tabIndex: '5' },
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
    dataField: 'type',
    text: 'Type du matériel',
    sort: true,
  },
  {
    dataField: 'local.nom',
    text: 'Local',
    sort: true,
  },
  {
    dataField: 'quantite',
    text: 'Quantité',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
