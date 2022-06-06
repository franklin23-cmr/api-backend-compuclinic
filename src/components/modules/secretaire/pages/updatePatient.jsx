/* eslint-disable no-unused-vars */
import { Card } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { PatientExterneForm } from '../components/patientExterneForm';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';

export const UpdatePatient = (props) => {
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
      <Card title='Modifiez les informations du patient' loading={isLoading}>
        <PatientExterneForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          dataInForm={p}
          submitButtonText='Modifiez les informations du patient'
        />
      </Card>
    </SecretaireBaseLayout>
  );
};
