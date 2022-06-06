import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/css-global/global-styles.css';
import './assets/css-global/modal-style.css';
import { Home } from './components/layout/home/pages/home';
import { Login } from './components/layout/login/pages/login';
import CaissierRoutes from './components/modules/caissier/routes';
import GrhRoutes from './components/modules/GRH/routes';
import InfirmiereRoutes from './components/modules/infirmiere/routes';
import LaborantinRoutes from './components/modules/Laboratin/routes';
import MedecinRoutes from './components/modules/medecin/routes';
import PlateauRoutesInfos from './components/modules/plateauInfosView/routes';
import PlateauRoutes from './components/modules/plateau_Technique/routes';
import SecretaireRoutes from './components/modules/secretaire/routes';
import { PageNotFound } from './components/shared/security/components/pageNotFound';
import { Unauthorized } from './components/shared/security/components/unauthorized';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/unauthorized' component={Unauthorized} />
        <Route path='/medecin' render={() => <MedecinRoutes />} />
        <Route path='/laborantin' render={() => <LaborantinRoutes />} />
        <Route path='/secretaire' render={() => <SecretaireRoutes />} />
        <Route path='/plateau' render={() => <PlateauRoutes />} />
        <Route path='/grh' render={() => <GrhRoutes />} />
        <Route
          path='/plateau-technique-public'
          render={() => <PlateauRoutesInfos />}
        />
        <Route path='/infirmiere' render={() => <InfirmiereRoutes />} />
        <Route path='/caissier' render={() => <CaissierRoutes />} />
        <Route path='/page-not-found' component={PageNotFound} />
        <Route render={() => <Redirect to='/page-not-found' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
