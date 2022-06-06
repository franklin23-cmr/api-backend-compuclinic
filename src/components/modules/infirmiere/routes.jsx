import { Redirect, Route } from 'react-router';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { DossierPatient } from './pages/dossierMedical';
import { PatientEnAttente } from './pages/patientAttente';
import { PriseParametre } from './pages/prise_parametre';
import { TousLesParametres } from './pages/tousLesParametres';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='Infirmier'>
      <Route
        exact
        path='/infirmiere'
        render={() => <Redirect to='/infirmiere/patient-attente' />}
      />
      <Route path='/infirmiere/patient-attente' component={PatientEnAttente} />
      <Route path='/infirmiere/prise-parametre' component={PriseParametre} />
      <Route
        path='/infirmiere/liste-parametres'
        component={TousLesParametres}
      />
      <Route path='/infirmiere/dossier-medical' component={DossierPatient} />
    </ProtectedRoutes>
  );
};

export default Routes;
