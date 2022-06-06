import { Redirect, Route } from 'react-router';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { CompleterPatient } from './pages/completerPatient';
import InscriptionPatient from './pages/inscriptionPatient';
import { ListeEquipement } from './pages/listeEquipement';
import { ListeInternement } from './pages/listeInternement';
import { ListePatient } from './pages/listePatient';
import { ListePresence } from './pages/listePresence';
import { ListeRDV } from './pages/listeRDV';
import { Personnel } from './pages/personnel';
import { UpdatePatient } from './pages/updatePatient';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='Secretaire'>
      <Route
        exact
        path='/secretaire'
        render={() => <Redirect to='/secretaire/inscription-patient' />}
      />
      <Route
        path='/secretaire/inscription-patient'
        component={InscriptionPatient}
      />
      <Route path='/secretaire/liste-patients' component={ListePatient} />
      <Route path='/secretaire/personnel' component={Personnel} />
      <Route
        path='/secretaire/completer-info-patient'
        component={CompleterPatient}
      />
      <Route path='/secretaire/update-info-patient' component={UpdatePatient} />
      <Route path='/secretaire/equipements' component={ListeEquipement} />
      <Route path='/secretaire/rendez-vous' component={ListeRDV} />
      <Route path='/secretaire/liste-presence' component={ListePresence} />
      <Route
        path='/secretaire/liste-internement'
        component={ListeInternement}
      />
    </ProtectedRoutes>
  );
};

export default Routes;
