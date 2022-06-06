import { BaseLayout } from '../../../layout/baseLayout/components/baseLayout';
import { MedecinRoutes } from './medecinRoutes';

export const MedecinBaseLayout = ({ children, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <BaseLayout
        children={children}
        clicked={clicked}
        routes={MedecinRoutes}
      />
    </div>
  );
};
