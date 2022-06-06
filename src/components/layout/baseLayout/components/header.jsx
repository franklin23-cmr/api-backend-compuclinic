import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { UpdatePasswordForm } from '../../../modules/GRH/components/PersonnelForms/UpdatePasswordForm';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import '../css/header.css';

export const Header = () => {
  const connectedUser = useSelector((state) => state.userReducer).user;
  const history = useHistory();

  return (
    <Space className='header-container'>
      {connectedUser.should_update_password && (
        <Tooltip
          title={
            <p style={{ textAlign: 'center' }}>
              Veuillez mettre à jour votre mot de passe pour plus de sécurité
            </p>
          }
        >
          <ButtonWithModal
            buttonText={<FaBell className='heart' size={18} />}
            buttonProps={{
              style: { backgroundColor: 'transparent', border: 0 },
            }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>Modifier le mot de passe</span>
              ),
            }}
          >
            {(closeModal) => (
              <UpdatePasswordForm
                personnelId={connectedUser.userId}
                closeModal={closeModal}
              />
            )}
          </ButtonWithModal>
        </Tooltip>
      )}
      {connectedUser.roles.length > 1 && (
        <Space>
          {connectedUser.roles.includes('Caissier') && (
            <Button type='primary' onClick={() => history.push('/caissier')}>
              Caissier
            </Button>
          )}
          {connectedUser.roles.includes('Medecin') && (
            <Button type='primary' onClick={() => history.push('/medecin')}>
              Médecin
            </Button>
          )}
          {connectedUser.roles.includes('Secretaire') && (
            <Button type='primary' onClick={() => history.push('/secretaire')}>
              Secrétaire
            </Button>
          )}
          {connectedUser.roles.includes('Infirmier') && (
            <Button type='primary' onClick={() => history.push('/infirmier')}>
              Infirmier
            </Button>
          )}
          {connectedUser.roles.includes('Laborantin') && (
            <Button type='primary' onClick={() => history.push('/laborantin')}>
              Laborantin
            </Button>
          )}
          {connectedUser.roles.includes('GRH') && (
            <Button type='primary' onClick={() => history.push('/grh')}>
              Ressource Humaine
            </Button>
          )}
          {connectedUser.roles.includes('Manager Plateau Technique') && (
            <Button type='primary' onClick={() => history.push('/plateau')}>
              Plateau Technique
            </Button>
          )}
        </Space>
      )}

      <FaUserCircle color='black' size={40} />
      <div>
        <p className='header-title'>
          {connectedUser.nom} {connectedUser.prenom}
        </p>
        <p className='header-sub-title'>{connectedUser.type_personnel}</p>
      </div>
    </Space>
  );
};
