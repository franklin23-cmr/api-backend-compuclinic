import { Button, notification, Space, Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaStethoscope } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  personnelNameFormatter,
} from '../../../shared/Table/cellFormatter';
import {
  endConsultation,
  getAllDiag,
  getAllExam,
  getAllMed,
  getAllParam,
  getAllRecom,
  getAllSymp,
} from '../network/medecin.network';
export const ResumeConsultation = ({ consultation }) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [parametres, setParametres] = useState([]);
  const [recommandations, setRecommandations] = useState([]);

  const [symptomes, setSymptomes] = useState([]);
  const [diagnotic, setDiagnotic] = useState([]);

  const [medicaments, setMedicaments] = useState([]);
  const [examens, setExamens] = useState([]);

  useEffect(() => {
    const syncExecute = async () => {
      await getAllParam(consultation.id).then((data) => {
        if (data?.result) {
          setParametres(data?.result);
        }
      });
      await getAllSymp(consultation.id).then((data) => {
        if (data?.result) {
          setSymptomes(data?.result);
        }
      });
      await getAllMed(consultation.id).then((data) => {
        if (data?.result) {
          setMedicaments(data?.result);
        }
      });
      await getAllExam(consultation.id).then((data) => {
        if (data?.result) {
          setExamens(data?.result);
        }
      });
      await getAllRecom(consultation.id).then((data) => {
        if (data?.result) {
          setRecommandations(data?.result);
        }
      });
      await getAllDiag(consultation.id).then((data) => {
        if (data?.result) {
          setDiagnotic(data?.result);
        }
      });
    };
    syncExecute().then(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ fontFamily: 'Tauri', fontSize: 15 }}>
      {isLoading ? (
        <Spin spinning={isLoading} />
      ) : (
        <div>
          <h4 style={{ textDecoration: 'underline', margin: 20 }}>
            Paramètres
          </h4>
          <Table
            columns={parametersColumns}
            data={parametres}
            isLoading={isLoading}
            hidePagination={true}
            hideSearchBar={true}
          />

          <h4 style={{ textDecoration: 'underline', margin: 20 }}>Symptômes</h4>
          <Table
            columns={symptomesColumns}
            data={symptomes}
            isLoading={isLoading}
            hidePagination={true}
            hideSearchBar={true}
          />

          <h4 style={{ textDecoration: 'underline', margin: 20 }}>
            Diagnostics (soupçons){' '}
          </h4>
          <Table
            columns={diagnoticColumns}
            data={diagnotic}
            isLoading={isLoading}
            hidePagination={true}
            hideSearchBar={true}
          />

          <h4 style={{ textDecoration: 'underline', margin: 20 }}>
            Récommandations
          </h4>
          <Table
            columns={recommandationColumns}
            data={recommandations}
            isLoading={isLoading}
            hidePagination={true}
            hideSearchBar={true}
          />

          <h4 style={{ textDecoration: 'underline', margin: 20 }}>
            Médicamments
          </h4>
          <Table
            columns={medicamentColumns}
            data={medicaments}
            isLoading={isLoading}
            hidePagination={true}
            hideSearchBar={true}
          />

          <h4 style={{ textDecoration: 'underline', margin: 20 }}>Examens</h4>
          <Table
            columns={examenColumns}
            data={examens}
            isLoading={isLoading}
            hidePagination={true}
            hideSearchBar={true}
          />
        </div>
      )}
      <Space>
        <Button
          type='primary'
          style={{
            backgroundColor: '#ff8619',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: 10,
          }}
          onClick={async () => {
            setIsLoading(true);
            console.log(consultation.id);
            endConsultation(consultation.id).then((data) => {
              if (data?.result.Succes) {
                setIsLoading(false);
                notification.success({
                  message: 'Succès',
                  description: 'La consultation a été enregistré',
                });
                history.push('/medecin/mes-consultations');
              }
            });
          }}
        >
          Terminer la consultation
        </Button>
      </Space>
    </div>
  );
};

const ActionFormatter = (cell, row) => {
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
        buttonProps={{ style: { backgroundColor: '#ff8619' } }}
      >
        {(closeModal) => (
          <>
            <Link
              to={{
                pathname: '/medecin/bulletin',
                state: { consultation: row },
              }}
              onClick={() => closeModal()}
            >
              <Button type='primary' style={{ width: 200 }}>
                regarder bulletin d'examen
              </Button>
            </Link>
            <Space style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                onClick={() => closeModal()}
                danger
                style={{ width: 200 }}
              >
                Fermer
              </Button>
            </Space>
          </>
        )}
      </ButtonWithModal>
    </Tooltip>
  );
};

const parametersColumns = [
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
    dataField: 'auteur.nom',
    text: 'Infirmière',
    formatter: personnelNameFormatter,
  },
  {
    dataField: 'date_prise',
    text: 'Date de Prise',
    sort: true,
    formatter: dateFormatter,
  },
];

const symptomesColumns = [
  {
    dataField: 'nom',
    text: 'Nom',
    sort: true,
  },
  {
    dataField: 'description',
    text: 'Description',
    sort: true,
  },
  {
    dataField: 'type_symptome',
    text: 'Type Symptome',
    sort: true,
  },
  {
    dataField: 'frequence',
    text: 'Frequence',
    sort: true,
  },
  {
    dataField: 'localisation',
    text: 'Localisation',
    sort: true,
  },
];

const medicamentColumns = [
  {
    dataField: 'medicament',
    text: 'Medicament',
    sort: true,
  },
  {
    dataField: 'dose',
    text: 'Dose',
    sort: true,
  },
  {
    dataField: 'frequence',
    text: 'Fréquence',
    sort: true,
  },
  {
    dataField: 'duree',
    text: 'Durée',
    sort: true,
  },
  {
    dataField: 'description',
    text: 'Description',
    sort: true,
  },
];

const examenColumns = [
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
    dataField: 'voir bulletin resultat',
    text: 'voir bulletin resultat',
    formatter: ActionFormatter,
  },
];

const recommandationColumns = [
  {
    dataField: 'label',
    text: 'Nom',
    sort: true,
  },

  {
    dataField: 'description',
    text: 'Description',
    sort: true,
  },
];

const diagnoticColumns = [
  {
    dataField: 'maladie',
    text: 'Maladie',
    sort: true,
  },

  {
    dataField: 'justificatif',
    text: 'Justificatif',
    sort: true,
  },
];
