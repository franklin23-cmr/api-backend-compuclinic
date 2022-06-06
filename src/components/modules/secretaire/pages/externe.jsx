/* eslint-disable no-unused-vars */
import { Form } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { PatientExterneForm } from '../components/patientExterneForm';
import '../css/secretaire.css';

export const Externe = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const history = useHistory();

  return (
    <div>
      {isLoading ? (
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
          <PatientExterneForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      )}
    </div>
  );
};
