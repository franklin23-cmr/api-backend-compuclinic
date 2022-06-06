import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { getInfrastructurePersonnel } from '../../plateau_Technique/network/plateauTechnique.network';
import { CardInfos } from '../components/CardInfos';

export const PersonnelView = ({ infrastructure }) => {
  const [personnel, setPersonnel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfrastructurePersonnel(infrastructure.id).then((data) => {
      if (data) {
        setPersonnel(data);
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
      {personnel.map((pers) => (
        <CardInfos personnel={pers.personnel} key={pers.id} />
      ))}
    </div>
  );
};
