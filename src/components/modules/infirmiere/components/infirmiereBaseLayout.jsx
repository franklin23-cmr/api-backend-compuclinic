import { BaseLayout } from '../../../layout/baseLayout/components/baseLayout';
import { InfirmiereRoutes } from './infirmiereRoutes';

export const InfirmiereBaseLayout = ({ children, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <BaseLayout
        children={children}
        clicked={clicked}
        routes={InfirmiereRoutes}
      />
    </div>
  );
};
