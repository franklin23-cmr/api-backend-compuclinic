import { Redirect, Route } from 'react-router-dom';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { GestionPlanning } from './pages/gestionPlanning';
import { GestionProfil } from './pages/gestionProfil';
import Inscrirepersonnel from './pages/InscrirePersonnel';
import { ListePersonnel } from './pages/listePersonnel';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='GRH'>
      <Route
        exact
        path='/grh'
        render={() => <Redirect to='/grh/personnel' />}
      />
      <Route path='/grh/personnel' component={ListePersonnel} />
      <Route path='/grh/inscription-personnel' component={Inscrirepersonnel} />
      <Route path='/grh/planning' component={GestionPlanning} />
      <Route path='/grh/profil' component={GestionProfil} />
    </ProtectedRoutes>
  );
};

export default Routes;
