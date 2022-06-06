import { Redirect, Route } from 'react-router';
import { ProtectedRoutes } from '../../shared/security/components/protectedRoutes';
import { Enregistrement } from './pages/Enregistrement';
import { Equipement } from './pages/Equipement';
import { Infrastructure } from './pages/Infrastructure';
import { Services } from './pages/Services';

const Routes = () => {
  return (
    <ProtectedRoutes authorization='Manager Plateau Technique'>
      <Route
        exact
        path='/plateau'
        render={() => <Redirect to='/plateau/infrastructures' />}
      />
      <Route path='/plateau/infrastructures' component={Infrastructure} />
      <Route path='/plateau/equipements' component={Equipement} />
      <Route path='/plateau/services' component={Services} />
      <Route path='/plateau/enregistrement' component={Enregistrement} />
    </ProtectedRoutes>
  );
};

export default Routes;
