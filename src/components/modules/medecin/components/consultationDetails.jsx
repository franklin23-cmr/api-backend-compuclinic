import { Button, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { DateFr, getAge } from '../../../shared/DateToFrench';
import { Table } from '../../../shared/Table';
import {
  dateFormatter,
  personnelNameFormatter,
} from '../../../shared/Table/cellFormatter';
import { getAllParam, getAllSymp, getAllMed,getAllExam, getAllRecom } from '../network/medecin.network';
export const ConsultationDetail = ({ consultation, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parametres, setParametres] = useState([]);
  const [recommandations, setRecommandations] = useState([]);

  const [symptomes, setSymptomes] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [examens, setExamens] = useState([]);


  const { dossier } = consultation;

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
    };
    syncExecute().then(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ fontFamily: 'Tauri', fontSize: 15 }}>
      {isLoading ? (
        <Spin spinning={isLoading} />
      ) : (
        <Space
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          <ButtonWithModal
            buttonText='Paramètres'
            buttonProps={{ type: 'primary' }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Liste des paramètres</span>
              ),
              width: 900,
            }}
          >
            {(closePeriodeModal) => (
              <Table
                columns={parametersColumns}
                data={parametres}
                isLoading={isLoading}
                hidePagination={true}
                hideSearchBar={true}
              />
            )}
          </ButtonWithModal>
          <ButtonWithModal
            buttonText='Symptômes'
            buttonProps={{ type: 'primary' }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Liste des symptomes</span>
              ),
              width: 900,
            }}
          >
            {(closePeriodeModal) => (
              <Table
                columns={symptomesColumns}
                data={symptomes}
                isLoading={isLoading}
                hidePagination={true}
                hideSearchBar={true}
              />
            )}
          </ButtonWithModal>
          
          <ButtonWithModal
            buttonText='Recomma...'
            buttonProps={{ type: 'primary' }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Prescriptions des Medicaments</span>
              ),
              width: 900,
            }}
          >
            {(closePeriodeModal) => (
              <Table
                columns={recommandationColumns}
                data={recommandations}
                isLoading={isLoading}
                hidePagination={true}
                hideSearchBar={true}
              />
            )}
          </ButtonWithModal>
          <ButtonWithModal
            buttonText='Medicaments'
            buttonProps={{ type: 'primary' }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Prescriptions des Medicaments</span>
              ),
              width: 900,
            }}
          >
            {(closePeriodeModal) => (
              <Table
                columns={medicamentColumns}
                data={medicaments}
                isLoading={isLoading}
                hidePagination={true}
                hideSearchBar={true}
              />
            )}
          </ButtonWithModal>
          
          <ButtonWithModal
            buttonText='Examens'
            buttonProps={{ type: 'primary' }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Prescriptions des examens</span>
              ),
              width: 900,
            }}
          >
            {(closePeriodeModal) => (
              <Table
                columns={examenColumns}
                data={examens}
                isLoading={isLoading}
                hidePagination={true}
                hideSearchBar={true}
              />
            )}
          </ButtonWithModal>
        </Space>
      )}

      <Space size={30}>
        <div>
          <p>Dossier </p>
          <p>Nom </p>
          <p>Prenom </p>
          <p>Type </p>
          <p>Nationalité </p>
          <p>Sexe </p>
          <p>Age </p>
          <p>Groupe Sanguin</p>
          <p>Service </p>
          <p>Médecin </p>
          <p>Date Consultation </p>
        </div>
        <div>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div>
          <p>{dossier?.matricule}</p>
          <p>{dossier?.patient?.nom} </p>
          <p>{dossier?.patient?.prenom}</p>
          <p>{dossier?.patient?.type || '----'}</p>
          <p>{dossier?.patient?.nationalite}</p>
          <p>{dossier?.patient?.sexe}</p>
          <p>{getAge(dossier?.patient?.date_naissance)} </p>
          <p>{dossier?.patient?.group_sanguin || '----'} </p>
          <p>{consultation?.service?.nom} </p>
          <p>
            {consultation?.medecin?.nom} {consultation?.medecin?.prenom}{' '}
          </p>
          <p>{DateFr(consultation?.date_creation)} </p>
        </div>
      </Space>

      <Button
        type='primary'
        onClick={() => closeModal()}
        style={{ display: 'block' }}
      >
        Fermer
      </Button>
    </div>
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