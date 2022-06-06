/* eslint-disable no-unused-vars */
import { Button, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaStethoscope } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import priseParametre2 from '../../../../assets/images/Infirmiere_homme.svg';
import priseParametre from '../../../../assets/images/prise_parametre.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import { dateFormatter } from '../../../shared/Table/cellFormatter';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import {
  getAllPrescription,
  updateListePrescrition,
} from '../network/laborantin.network';

let dataStore;

export const Listesprescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const { user } = useSelector((state) => state.userReducer).user;
  useEffect(() => {
    setIsLoading(true);
    getAllPrescription().then((data) => {
      if (data) {
        console.log('examen en attente ', data);
        setPatients(data?.result);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <MedecinBaseLayout clicked={'patient'}>
      <Table columns={columns} data={patients} isLoading={isLoading} />
    </MedecinBaseLayout>
  );
};

function ActionFormatter(cell, row) {
  // let dataStore;
  let datapatch = {
    est_fait: true,
  };

  return (
    <Tooltip title='Effectuer une consultation'>
      <ButtonWithModal
        buttonText={<FaStethoscope size={18} color='white' />}
        modalProps={{
          title: (
            <span style={{ color: 'white' }}>
              Débuter la consultation du patient
            </span>
          ),
          width: 650,
        }}
      >
        {(closeModal) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img
              alt=''
              src={row.sexe === 'H' ? priseParametre2 : priseParametre}
              style={{ width: 350, height: 350 }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h5 style={{ marginBottom: 10, textAlign: 'center' }}>
                voulez vous effectuer cet examen ???
              </h5>
              <p
                style={{
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              ></p>
              <Space style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                  to={{
                    pathname: '/laborantin/examen_encours',
                    state: { prescription: row },
                  }}
                  onClick={() =>
                    updateListePrescrition(row.id, datapatch).then((data) => {
                      console.log('update list', row);
                      if (data) {
                        dataStore = data;
                        setDataPost(data);
                        getdataPost();
                        // console.log(dataStore);
                      }
                    })
                  }
                >
                  <Button
                    type='primary'
                    style={{ width: 175 }}
                    onClick={() =>
                      updateListePrescrition(row.id, datapatch).then((data) => {
                        // console.log(row);
                        if (data) {
                          dataStore = data;
                          setDataPost(data);
                          getdataPost();
                          // console.log(dataStore);
                        }
                      })
                    }
                  >
                    accepter
                  </Button>
                </Link>
                <Button
                  onClick={() => closeModal()}
                  danger
                  style={{ width: 175 }}
                >
                  Fermer
                </Button>
              </Space>
            </div>
          </div>
        )}
      </ButtonWithModal>
    </Tooltip>
  );
}

function setDataPost(data) {
  dataStore = data;
}

export function getdataPost() {
  return dataStore;
}

const columns = [
  {
    dataField: 'id',
    text: 'numero serie fiole',
    sort: true,
  },
  {
    dataField: 'consultation.id',
    text: 'id consultation',
    sort: true,
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
  },

  {
    dataField: 'date_creation',
    text: 'Date de début Consultation',
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: 'action',
    text: 'select exams',
    formatter: ActionFormatter,
  },
];
