import { Redirect, Route } from 'react-router';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { ActivateTiaps } from './pages/activateTiaps';
import { Bons } from './pages/BONS';
import { PatientEnAttente } from './pages/patientEnAttente';
import { Quittance } from './pages/quittance';
import { TIAPS } from './pages/TIAPS';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='Caissier'>
      <Route
        exact
        path='/caissier'
        render={() => <Redirect to='/caissier/patient-attente' />}
      />
      <Route path='/caissier/patient-attente' component={PatientEnAttente} />
      <Route path='/caissier/quittance' component={Quittance} />
      <Route path='/caissier/activate-tiaps' component={ActivateTiaps} />
      <Route path='/caissier/tiaps' component={TIAPS} />
      <Route path='/caissier/bons' component={Bons} />
    </ProtectedRoutes>
  );
};

export default Routes;
