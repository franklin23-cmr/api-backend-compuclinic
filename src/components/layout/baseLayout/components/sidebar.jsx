import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/CompuClinic.png';
import SideImage from '../../../../assets/images/sidebar.svg';
import { createUser } from '../../../../redux/userStore/actions';
import '../css/sidebar.css';

export const SideBar = ({ routes, clicked }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className='side-nav'>
        <div className='compu'>
          <img src={logo} alt='logo' className='side-logo' />
        </div>
        <div className='side-line'></div>

        {routes.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.link}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div className={clicked === item.clicked ? 'clicked' : 'link'}>
                {item.icon(clicked)}
                <span className='side-bar-text'>{item.text}</span>
              </div>
            </Link>
          );
        })}

        <Link
          to='/login'
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          onClick={() => {
            localStorage.clear();
            dispatch(
              createUser({
                authentifie: false,
                roles: [],
                id: '',
                nom: '',
                prenom: '',
                email: '',
                username: '',
                matricule: '',
                telephone: '',
                should_update_password: '',
                type_personnel: '',
                image: '',
                userId: '',
              }),
            );
          }}
        >
          <div className={clicked === 'deconnect' ? 'clicked' : 'link'}>
            <FaSignInAlt
              color={clicked === 'deconnect' ? 'white' : 'black'}
              size={18}
            />

            <span className='side-bar-text'>Déconnecter</span>
          </div>
        </Link>
        <img
          src={SideImage}
          alt=''
          width={190}
          height={170}
          className='side-img'
        />
      </div>
    </div>
  );
};
