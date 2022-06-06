import { BaseLayout } from '../../../layout/baseLayout/components/baseLayout';
import { CaissierRoutes } from './caissierRoutes';

export const CaissierBaseLayout = ({ children, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <BaseLayout
        children={children}
        clicked={clicked}
        routes={CaissierRoutes}
      />
    </div>
  );
};
