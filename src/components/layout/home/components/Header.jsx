import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/CompuClinic.png';

export const Header = () => {
  return (
    <nav className='navbar sticky-top navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='row'>
        <img
          src={logo}
          alt='logo'
          style={{
            height: 60,
            width: 80,
            marginLeft: 15,
            marginRight: -20,
          }}
        />
        <span className='logo'>
          C<span style={{ color: 'black' }}>ompu</span>C
          <span style={{ color: 'black' }}>linic</span>
        </span>
      </Link>

      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navmenu'
        aria-controls='navmenu'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navmenu'>
        <ul className='navbar-nav ml-auto'>
          <li
            className='nav-item'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
          >
            <Link className='links' to='/'>
              Acceuil
            </Link>
          </li>

          <li
            className='nav-item'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
          >
            <Link className='links' to='/'>
              Plateau Technique
            </Link>
          </li>

          <li
            className='nav-item'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
          >
            <Link className='links' to='/login'>
              Connexion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
