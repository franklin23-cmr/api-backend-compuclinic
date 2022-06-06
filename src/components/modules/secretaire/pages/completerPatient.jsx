/* eslint-disable no-unused-vars */
import { Card } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { PatientForm } from '../components/patientInterneForm';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';

export const CompleterPatient = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState(props.location.state);
  const p = {};
  Object.keys(patient).forEach((key) => {
    if (key === 'date_naissance') {
      p[key] = moment(patient[key], 'YYYY-MM-DD');
    } else {
      p[key] = patient[key];
    }
  });
  return (
    <SecretaireBaseLayout clicked={'patientList'}>
      <Card title='Completez les informations du patient' loading={isLoading}>
        <PatientForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          dataInForm={p}
          submitButtonText='Transférer le patient à interne'
        />
      </Card>
    </SecretaireBaseLayout>
  );
};
