import TextField from '@material-ui/core/TextField';
import { notification } from 'antd';
import Cryptr from 'cryptr';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import logo3 from '../../../../assets/images/CompuClinic.png';
import logo2 from '../../../../assets/images/doctor.svg';
import logo1 from '../../../../assets/images/signin.svg';
import { createUser } from '../../../../redux/userStore/actions';
// import { useSelector } from 'react-redux';
import '../css/forms.css';
import { redirection } from '../network/login.methods';
import { getProfil, submitLoginForm } from '../network/login.network';
// import logo1 from '../../../../assets/images/Login.png';
// import logo2 from '../../../../assets/images/logo-page-acceuil.svg';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const dataToPost = {
      username,
      password,
    };

    submitLoginForm(dataToPost).then((data) => {
      if (data?.result?.access) {
        const cryptr = new Cryptr('aybrCoDA1hNLW8kTIdcVQX6reqe4bHqk');
        const encrypted_access = cryptr.encrypt(data.result.access);
        localStorage.setItem('access-token', encrypted_access);
        getProfil().then((data) => {
          const profil = data.result;
          dispatch(
            createUser({
              authentifie: true,
              roles: profil.groups.map((item) => item.name),
              id: profil.personnel.id,
              nom: profil.personnel.nom,
              prenom: profil.personnel.prenom,
              email: profil.personnel.email,
              username: profil.username,
              userId: profil.id,
              matricule: profil.personnel.matricule,
              telephone: profil.personnel.telephone,
              should_update_password: profil.personnel.should_update_password,
              type_personnel: profil.personnel.type_personnel,
              image: profil.personnel.image,
              nextAuthDate: new Date().getTime() + 23.8 * 60 * 60 * 1000,
            }),
          );
          setIsLoading(false);
          console.log(profil.personnel.type_personnel);
          history.push(redirection(profil.personnel.type_personnel));
        });
      } else {
        notification.error({
          message: 'Erreur',
          description: 'Vérifiez les informations rentrées',
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <div className='login-body'>
      <div className='hide-responsive col-md-6'>
        <div>
          <img
            src={logo3}
            alt=''
            style={{
              width: 400,
              marginLeft: 100,
              objectFit: 'cover',
            }}
          />
        </div>
        <img
          src={logo2}
          alt=''
          style={{ width: 550, height: 360, objectFit: 'cover' }}
        />
      </div>

      <div className='col-md-6'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={logo1}
            alt=''
            style={{
              width: 290,
              objectFit: 'cover',
              marginBottom: -50,
            }}
            className='hide-responsive'
          />

          <div className='show-responsive'>
            <img
              src={logo3}
              alt=''
              style={{ width: 250, height: 250, objectFit: 'cover' }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <form className='forms' onSubmit={(event) => handleSubmit(event)}>
            <h1 style={{ fontSize: 30, fontFamily: 'Montserrat' }}>
              Bienvenue sur CompuClinic
            </h1>
            <h5 style={{ textAlign: 'center', marginBottom: 20 }}>
              Plateforme de gestion des patients de votre structure de soins de
              santé
            </h5>

            <TextField
              required
              className='textfield'
              label="Nom d'utilisateur"
              variant='outlined'
              color='primary'
              onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
              required
              className='textfield'
              label='Mot de Passe'
              variant='outlined'
              type='password'
              onChange={(event) => setPassword(event.target.value)}
            />

            <div style={{ marginTop: 20 }}>
              <button type='submit' className='btn btn-primary'>
                Se Connecter
              </button>
            </div>
            {isLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '80%',
                  marginTop: 20,
                }}
              >
                <BeatLoader loading={isLoading} size={20} color='#0047FF' />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
