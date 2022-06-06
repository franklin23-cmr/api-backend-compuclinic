import { Redirect, Route } from 'react-router';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { BulletinResultat } from '../medecin/pages/bulletinResultat';
import { Differentiels } from './components/differentiels';
import { Bons } from './pages/BONS';
import { Consultations } from './pages/consultations';
import { DossierPatient } from './pages/dossierMedical';
import { EmploiTemps } from './pages/emploi_temps';
import { MesConsultation } from './pages/mesConsultation';
import { PatientEnAttente } from './pages/patientEnAttente';
import { PriseParametre } from './pages/prise_parametre';
import { TousLesPatients } from './pages/tousLesPatients';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='Medecin'>
      <Route
        exact
        path='/medecin'
        render={() => <Redirect to='/medecin/patient' />}
      />
      <Route path='/medecin/bons' component={Bons} />
      <Route path='/medecin/consultations' component={Consultations} />
      <Route path='/medecin/mes-consultations' component={MesConsultation} />
      <Route path='/medecin/patient' component={PatientEnAttente} />
      <Route path='/medecin/tous-les-patients' component={TousLesPatients} />
      <Route path='/medecin/prise-parametre' component={PriseParametre} />
      <Route path='/medecin/dossier-medical' component={DossierPatient} />
      <Route path='/medecin/emploi-temps' component={EmploiTemps} />
      <Route path='/medecin/differentiels' component={Differentiels} />
      <Route path='/medecin/bulletin' component={BulletinResultat} />
    </ProtectedRoutes>
  );
};

export default Routes;
