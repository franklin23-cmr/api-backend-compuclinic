//import Protected from '../layout/protectedRoutes'
import { Route } from 'react-router';
import { Maps } from './components/Map/Map';
import { PlateauInfos } from './pages/PlateauInfos';
import { PlateauInfosHos } from './pages/PlateauInfosHos';

const Routes = () => {
  return (
    <>
      <Route exact path='/plateau-technique-public' component={PlateauInfos} />
      <Route
        exact
        path='/plateau-technique-public/structure'
        component={PlateauInfosHos}
      />
      <Route exact path='/plateau-technique-public/map' component={Maps} />
    </>
  );
};

export default Routes;
