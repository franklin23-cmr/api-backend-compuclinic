import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

export class Home extends React.Component {
  render() {
    return (
      <div className='acceuil'>
        <div className='container'>
          <h1
            style={{
              color: 'white',
              marginLeft: 30,
              fontSize: 60,
            }}
          >
            CompuClinic
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div style={{ width: 350 }}>
              <p
                style={{
                  fontSize: 25,
                  marginTop: 50,
                  marginBottom: 50,
                  color: 'white',
                }}
              >
                Plateforme de Gestion des Patients de la Structure de Santé
                ainsi que les Dossiers Médicaux et les Quittances et d'autres
                services Médicaux que offre la Structure
              </p>
            </div>
            <Link
              className='btn btn-outline-light btn-lg'
              style={{
                width: 250,
                height: 50,
              }}
              to='/login'
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
