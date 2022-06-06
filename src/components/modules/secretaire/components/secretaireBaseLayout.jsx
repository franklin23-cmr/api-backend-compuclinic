import { BaseLayout } from '../../../layout/baseLayout/components/baseLayout';
import { SecretaireRoutes } from './secretaireRoutes';

export const SecretaireBaseLayout = ({ children, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <BaseLayout
        children={children}
        clicked={clicked}
        routes={SecretaireRoutes}
      />
    </div>
  );
};
