import { Button, Image } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo401 from '../../../../assets/images/401.svg';
import '../css/notfound.css';

export const Unauthorized = () => {
  const history = useHistory();
  return (
    <div className='not-found-container'>
      <div className='shadow not-found'>
        <div className='line2'></div>
        <h2>Non Authorisé </h2>
        <p>
          Vous n'avez pas les droits nécessaire pour accéder à la ressource
          demandée. Veillez contacter votre administrateur
        </p>
        <Image
          src={logo401}
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
