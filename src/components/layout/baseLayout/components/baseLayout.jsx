import { Header } from './header';
import { SideBar } from './sidebar';

export const BaseLayout = ({ children, routes, clicked }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', minHeight: 720 }}>
      <SideBar routes={routes} clicked={clicked} />
      <Header />
      <div className='main-base-layout'>{children}</div>
    </div>
  );
};
