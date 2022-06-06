import { BaseLayout } from '../../../layout/baseLayout/components/baseLayout';
import { GrhRoutes } from './grhRoutes';

export const GrhBaseLayout = ({ children, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <BaseLayout
        children={children}
        clicked={clicked}
        routes={GrhRoutes}
      />
    </div>
  );
};
