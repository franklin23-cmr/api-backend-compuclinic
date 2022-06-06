import { Image } from 'antd';
import React from 'react';
import logo404 from '../../../../assets/images/404.svg';
import '../css/notfound.css';

export const PageNotFound = () => {
  return (
    <div className='not-found-container'>
      <div className='box-shadow not-found'>
        <div className='line'></div>
        <h2>Page Not Found </h2>

        <Image
          src={logo404}
          width={300}
          style={{ objectFit: 'cover' }}
          preview={false}
        />
        <p>La ressource que vous avez demandé n'est pas disponible!</p>
      </div>
    </div>
  );
};
