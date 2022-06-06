/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { PatientForm } from '../components/patientInterneForm';

export const Interne = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);

  return (
    <div>
      {redirectLogin ? (
        <Redirect to='/login' />
      ) : isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <div>
            <h2 style={{ color: '#417ef7', marginLeft: -60 }}>
              Inscription En cours
            </h2>
            <BeatLoader loading={isLoading} size={50} color='#417ef7' />
          </div>
        </div>
      ) : (
        <div>
          <PatientForm isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      )}
    </div>
  );
};
