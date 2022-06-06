import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { getInfrastructureServices } from '../../plateau_Technique/network/plateauTechnique.network';
import { CardS } from '../components/CardS';

export const PlateauServiceView = ({ infrastructure }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfrastructureServices(infrastructure.id).then((data) => {
      if (data) {
        setServices(data);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <div style={{ width: 500, height: '80vh' }}>
      <BeatLoader loading={isLoading} size={20} color='#0047FF' />
    </div>
  ) : (
    <div className='wrapper'>
      {services.map((pers) => (
        <CardS service={pers} key={pers.id} />
      ))}
    </div>
  );
};
