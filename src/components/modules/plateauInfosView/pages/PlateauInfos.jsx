import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import logo from '../../../../assets/images/CompuClinic.png';
import {
  getInfrastructureFiltre,
  getInfrastructures,
  getServiceFiltre,
  getServices,
} from '../../plateau_Technique/network/plateauTechnique.network';
import { CardInfos } from '../components/CardInfos';
import { CardS } from '../components/CardS';
import '../css/plateau-public.css';

export const PlateauInfos = () => {
  const { Search } = Input;

  const [isLoading, setIsLoading] = useState(false);
  const [infras, setInfras] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    getInfrastructures().then((data) => {
      setInfras(data?.result);
      setIsLoading1(false);
    });

    getServices().then((data) => {
      setServices(data?.result);
      setIsLoading2(false);
    });
  }, []);

  const loadInfos = async (value) => {
    setIsLoading(true);
    setIsLoading1(true);
    setIsLoading2(true);

    getInfrastructureFiltre(value).then((data) => {
      setInfras(data);
      setIsLoading1(false);
      setIsLoading(false);
    });
    getServiceFiltre(value).then((data) => {
      setServices(data);
      setIsLoading2(false);
      setIsLoading(false);
    });
  };

  return (
    <div>
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
                Services Publics
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className='plateau-container'>
        <Search
          placeholder='input search text'
          enterButton='Search'
          size='large'
          loading={isLoading}
          onSearch={(value) => loadInfos(value)}
          style={{ border: 0 }}
        />

        <h3>Infrastructures Médicales</h3>
        <hr></hr>
        {isLoading1 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '20vh',
            }}
          >
            <BeatLoader loading={isLoading1} size={20} color='#0047FF' />
          </div>
        ) : (
          <div className='wrapper'>
            {infras.map((infras) => (
              <CardInfos infrastructure={infras} key={infras.id} />
            ))}
            {infras.length === 0 && (
              <h5 style={{ fontFamily: 'Tauri', textAlign: 'center' }}>
                Aucun résultat
              </h5>
            )}
          </div>
        )}

        <h3>Services Médicaux</h3>
        <hr></hr>
        {isLoading2 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '20vh',
            }}
          >
            <BeatLoader loading={isLoading2} size={20} color='#0047FF' />
          </div>
        ) : (
          <div className='wrapper'>
            {services.map((service) => (
              <CardS service={service} key={service.id} />
            ))}
            {services.length === 0 && (
              <h5 style={{ fontFamily: 'Tauri', textAlign: 'center' }}>
                Aucun résultat
              </h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
