/* eslint-disable no-unused-vars */
import { Card } from 'antd';
import React, { useState } from 'react';
import { DossierMedical } from '../../../shared/DossierMedical';
import { InfirmiereBaseLayout } from '../components/infirmiereBaseLayout';

export const DossierPatient = (props) => {
  const [quittance, setQuittance] = useState(props.location?.state.quittance);
  const [medecin, setMedecin] = useState(props.location?.state.medecin);
  return (
    <InfirmiereBaseLayout clicked={'patientAttente'}>
      <Card title='Dossier Médical'>
        <DossierMedical
          patient={quittance.patient}
          medecin={medecin}
          linkToConsult='/infirmiere/prise-parametre'
        />
      </Card>
    </InfirmiereBaseLayout>
  );
};
