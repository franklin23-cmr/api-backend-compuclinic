import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import building from '../../../../../../assets/images/building.svg';
import { ButtonWithModal } from '../../../../../shared/ButtonWithModal';
import { Table } from '../../../../../shared/Table';
import { personnelNameFormatter } from '../../../../../shared/Table/cellFormatter';
import { getInfrastructures } from '../../../network/plateauTechnique.network';

export const InfrastructureTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [infrastructures, setInfras] = useState([]);

  useEffect(() => {
    getInfrastructures().then((data) => {
      console.log(data);
      setInfras(data?.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Table isLoading={isLoading} data={infrastructures} columns={columns} />
    </div>
  );
};
const actionFormatter = (cell, row) => {
  return (
    <Space>
      <Tooltip title='modifier Infrastructure'>
        <ButtonWithModal
          buttonText={<FaPen size={13} color='white' />}
          modalProps={{
            title: (
              <span style={{ color: 'white' }}>Modifier l'infrastructure</span>
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
                  Voulez vous modifier les informations de L'infrastructure ?
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
                      state: { infras: row, tabIndex: '1' },
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
    dataField: 'ville',
    text: 'Ville',
    sort: true,
  },
  {
    dataField: 'classe',
    text: 'Classe',
    sort: true,
  },
  {
    dataField: 'date_creation',
    text: 'Date de création',
    sort: true,
  },
  {
    dataField: 'directeur.nom',
    text: 'Directeur',
    sort: true,
    formatter: personnelNameFormatter,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: actionFormatter,
  },
];
