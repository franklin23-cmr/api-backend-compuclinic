import { Redirect, Route } from 'react-router';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { BulletinResultat } from './pages/bulletinResultat';
import { EmploiTemps } from './pages/emploi_temps';
import { ExamenEnAttente } from './pages/ExamenEnAttente';
import { Listesprescription } from './pages/listesprescription';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='Laborantin'>
      <Route
        exact
        path='/laborantin'
        render={() => <Redirect to='/laborantin/examen_encours' />}
      />
      <Route path='/laborantin/examen_encours' component={ExamenEnAttente} />
      <Route path='/laborantin/emploi-temps' component={EmploiTemps} />
      <Route
        path='/laborantin/liste-prescription'
        component={Listesprescription}
      />
      <Route path='/laborantin/examen_bulletin' component={BulletinResultat} />
    </ProtectedRoutes>
  );
};

export default Routes;
