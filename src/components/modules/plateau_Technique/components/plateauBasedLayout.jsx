import { BaseLayout } from '../../../layout/baseLayout/components/baseLayout';
import { PlateauRoutes } from './plateauRoutes';

export const PlateauBaseLayout = ({ children, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <BaseLayout
        children={children}
        clicked={clicked}
        routes={PlateauRoutes}
      />
    </div>
  );
};
