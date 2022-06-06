import { Button, Image, Space } from 'antd';
// import { Link } from 'react-router-dom';
import imageDossier from '../../../assets/images/image_dossier.png';
import { ParaForm } from '../../modules/infirmiere/components/paraForm';
import { ButtonWithModal } from '../ButtonWithModal';
import { DateFr, getAge } from '../DateToFrench';

export const DossierMedical = ({
  patient,
  medecin,
  linkToConsult,
  readOnly,
}) => {
  return (
    <div>
      <Space size={20}>
        <Image src={imageDossier} height={290} width={290} />
        <div>
          <p>Nom : {patient?.nom} </p>
          <p>Prénom : {patient?.prenom} </p>
          <p>Sexe : {patient?.sexe} </p>
          <p>Age : {getAge(patient?.date_naissance)} </p>
          <p>Type : {patient?.type} </p>
          <p>Matricule : {patient?.matricule} </p>
          <p>Identification : {DateFr(patient?.date_creation)} </p>

          <Space>
            <Button type='primary'>Imprimer le dossier</Button>
            {!readOnly && (
              <ButtonWithModal
                modalProps={{
                  title: (
                    <span style={{ color: 'white' }}>
                      Débuter la consultation
                    </span>
                  ),
                }}
                buttonProps={{ type: 'primary' }}
                buttonText='Débuter la consultation'
              >
                {(closeModal) => (
                  <ParaForm
                    linkToConsult={linkToConsult}
                    closeModal={closeModal}
                    medecin={{
                      id: medecin.id,
                      nom: `${medecin.nom} ${medecin.prenom}`,
                    }}
                    patient={patient}
                  />
                )}
              </ButtonWithModal>
            )}
          </Space>
        </div>
      </Space>
      <Space size={200} style={{ marginTop: 20 }}>
        <div>
          <Space>
            <div>
              <p>Contact : </p>
              <p>Nationalité :</p>
              <p>Lieu de Naissance : </p>
              <p>Profession :</p>
              <p>Ethnie : </p>
              <p>Group sanguin : </p>
              <p>N° CNI :</p>
              <p>Lieu de Travail : </p>
              <p>Telephone lieu de travail : </p>
            </div>
            <div>
              <p>{patient?.telephone} </p>
              <p>{patient?.nationalite} </p>
              <p>{patient?.lieu_naissance} </p>
              <p>{patient?.profession} </p>
              <p>{patient?.ethnie || '------'} </p>
              <p>{patient?.group_sanguin || '------'} </p>
              <p>{patient?.CNI || '------'} </p>
              <p>{patient?.lieu_travail} </p>
              <p>{patient?.telephone_lieu_travail || '------'} </p>
            </div>
          </Space>
        </div>
        <div>
          <Space>
            <div>
              <p>Domicile : </p>
              <p>Réligion : </p>
              <p>Nom du Garant : </p>
              <p>Prénom du Garant : </p>
              <p>Contact du Garant :</p>
              <p>Adresse du Garant : </p>
              <p>Professiondu Garant : </p>
              <p>Lieu de travail du Garant : </p>
            </div>
            <div>
              <p>{patient?.domicile} </p>
              <p>{patient?.religion || '------'} </p>
              <p>{patient?.nom_garant || '------'} </p>
              <p>{patient?.prenom_garant || '------'} </p>
              <p>{patient?.telephone_garant || '------'} </p>
              <p>{patient?.adresse_garant || '------'} </p>
              <p>{patient?.profession_garant || '------'} </p>
              <p>{patient?.lieu_travail_garant || '------'} </p>
            </div>
          </Space>
        </div>
      </Space>

      <h5 style={{ textDecoration: 'underline', marginTop: 20 }}>Antécédent</h5>
      <ul>
        {patient?.antecedent.split('\n').map((item, index) => (
          <li key={index}>{item} </li>
        ))}
      </ul>
      {/* <Link
        to={{
          pathname: '/medecin/consultations',
          state: { consultation: patient },
        }}
      >
        <Button type='primary' style={{ width: 300 }}>
          Continuer avec la consultation
        </Button>
      </Link> */}
    </div>
  );
};
