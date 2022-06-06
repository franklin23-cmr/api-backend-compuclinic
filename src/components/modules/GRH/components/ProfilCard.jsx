import { Avatar, Card, Image, Tooltip } from 'antd';
import { FaEyeSlash, FaPen, FaUserEdit } from 'react-icons/fa';
import secretaire from '../../../../assets/images/secretaire.png';
import { ButtonWithModal } from '../../../shared/ButtonWithModal';
import { ProfilForm } from './PersonnelForms/ProfilForm';

export const ProfilCard = ({ personnel, groups, refreshRequest }) => {
  return (
    <Card
      hoverable
      className='profils-card'
      actions={[
        <Tooltip title={personnel.user ? '' : 'Créer un profil'}>
          <ButtonWithModal
            buttonText={<FaUserEdit size={20} color='#777' />}
            buttonProps={{
              style: { backgroundColor: 'transparent', border: 0 },
              disabled: personnel.user ? true : false,
            }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>
                  Créer un nouveau profil au personnel
                </span>
              ),
            }}
          >
            {(closeModal) => (
              <div>
                <ProfilForm
                  personnel={personnel}
                  closeModal={() => {
                    closeModal();
                    refreshRequest();
                  }}
                  groups={groups}
                />
              </div>
            )}
          </ButtonWithModal>
        </Tooltip>,
        <Tooltip title={personnel.user ? 'Modifier le profil' : ''}>
          <ButtonWithModal
            buttonText={<FaPen size={16} color='#777' />}
            buttonProps={{
              style: { backgroundColor: 'transparent', border: 0 },
              disabled: personnel.user ? false : true,
            }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>
                  Modifier le profil du personnel
                </span>
              ),
            }}
          >
            {(closeModal) => (
              <ProfilForm
                personnel={personnel}
                updating={true}
                closeModal={() => {
                  closeModal();
                  refreshRequest();
                }}
                groups={groups}
              />
            )}
          </ButtonWithModal>
        </Tooltip>,
        <Tooltip title='Réinitialiser le mot de passe'>
          <ButtonWithModal
            buttonText={<FaEyeSlash size={20} color='#777' />}
            buttonProps={{
              style: { backgroundColor: 'transparent', border: 0 },
            }}
            modalProps={{
              title: (
                <span style={{ color: 'white' }}>
                  Réinitialiser le mot de passe du personnel
                </span>
              ),
            }}
          >
            {(closeModal) => <div></div>}
          </ButtonWithModal>
        </Tooltip>,
      ]}
      cover={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 10,
          }}
        >
          <Avatar
            size={200}
            src={
              <Image
                height={200}
                width={200}
                style={{ objectFit: 'contain' }}
                src={secretaire}
              />
            }
          />
        </div>
      }
    >
      <div>
        <p className='profils-name'>{`${personnel.nom} ${personnel.prenom}`}</p>
        <p className='profils-type'>{personnel.type_personnel} </p>
        <div className='profil-roles'>
          {groups.map((group) => {
            if (personnel.user?.groups?.indexOf(group.value) >= 0) {
              return <p>{group.label} </p>;
            }
            return <span></span>;
          })}
          {(!personnel?.user || !personnel?.user.groups.length === 0) && (
            <p>--</p>
          )}
        </div>
      </div>
    </Card>
  );
};
