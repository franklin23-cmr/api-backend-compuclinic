import { Button, Image } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import signin from '../../../../assets/images/signin.svg';
import '../css/notfound.css';

export const NotConnected = () => {
  const history = useHistory();
  return (
    <div className='not-found-container'>
      <div className='shadow not-found'>
        <div className='line2'></div>
        <h2>Non Authentifié </h2>
        <p>
          Vous n'êtes pas connecté sur votre compte utilisateur. Veillez vous
          connecter ou contacter votre administrateur
        </p>
        <Image
          src={signin}
          width={250}
          style={{ objectFit: 'cover' }}
          preview={false}
        />
        <Button
          type='primary'
          size='large'
          onClick={() => history.push('/login')}
        >
          Connexion
        </Button>
      </div>
    </div>
  );
};
