import { Button, Space } from 'antd';
import { FaClipboardList, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import caissier from '../../../../assets/images/caissier.png';
import doctor from '../../../../assets/images/doctor2.png';
import infirmier from '../../../../assets/images/infirmiere.png';
import laborantin from '../../../../assets/images/laborantin.png';
import secretaire from '../../../../assets/images/secretaire.png';
import modifierPatient from '../../../../assets/images/secretaire.svg';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { PersonnelDetail } from './personnelDetail';

export const PersonnelCard = ({ personnel, byGrh, row }) => {
  return (
    <div className='person'>
      <img
        src={
          personnel.type_personnel === 'Medecin'
            ? doctor
            : personnel.type_personnel === 'Infirmier'
            ? infirmier
            : personnel.type_personnel === 'Laborantin'
            ? laborantin
            : personnel.type_personnel === 'Caissier'
            ? caissier
            : secretaire
        }
        alt=''
        className='img-doc'
      />
      <h5 style={{ marginTop: 5 }}>{personnel?.nom + ' ' + personnel?.prenom}</h5>
      <p style={{ color: 'grey' }}>{personnel?.domicile} </p>

      <div
        style={{
          paddingTop: 5,
          height: 35,
          width: 150,
          backgroundColor: '#D8ECFF',
          borderRadius: 5,
        }}
      >
        <p
          style={{
            color: '#0047FF',
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          {personnel.profilspecialiste?.specialite || personnel.type_personnel}
        </p>
      </div>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 10,
          width: '80%',
        }}
      >
        {byGrh && (
          <ButtonWithModal
          buttonText={<FaPen size={13} color='white' />}
          modalProps={{
            title: (
              <span style={{ color: 'white' }}>Modifier le Personnel</span>
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
                src={modifierPatient}
                alt=''
                style={{ width: 350, height: 350 }}
              />
              <div>
                <h5 style={{ textAlign: 'center' }}>
                  Voulez vous modifier les informations de ce membre du personnel
                </h5>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                >
                  
                </p>
                <Space
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    to={{
                      pathname: '/grh/inscription-personnel',
                      state: personnel,
                    }}
                    onClick={() => closeModal()}
                  >
                    <Button style={{ width: 200 }} type='primary'>
                      Oui
                    </Button>
                  </Link>
                  <Button
                    style={{ width: 200 }}
                    onClick={() => closeModal()}
                    type='primary'
                    danger
                  >
                    Non
                  </Button>
                </Space>
              </div>
            </div>
          )}
        </ButtonWithModal>
        )}
        <ButtonWithModal
          buttonText={<FaClipboardList size={18} />}
          buttonProps={{ type: 'primary' }}
          modalProps={{
            title: <span style={{ color: 'white' }}>Détails du Personnel</span>,
          }}
        >
          {(closeModal) => (
            <PersonnelDetail personnel={personnel} closeModal={closeModal} />
          )}
        </ButtonWithModal>
      </Space>
    </div>
  );
};
