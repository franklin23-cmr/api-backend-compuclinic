import { Button, Image } from 'antd';
import { useHistory } from 'react-router';
import building from '../../../../../assets/images/building.svg';
import '../../css/infrastructureInfo.css';
import { CustomTimeline } from './customTimeline';

export const Profile = ({ infrastructure }) => {
  const history = useHistory();
  return (
    <div className='infras-infos box-shadow'>
      <h3 className='infras-name'>{infrastructure.nom}</h3>
      <Image
        alt='structure'
        src={infrastructure.image || building}
        style={{ width: '100%', objectFit: 'cover' }}
      />
      <CustomTimeline infras={infrastructure} />
      <Button
        size='large'
        type='primary'
        onClick={() =>
          history.push('/plateau-technique-public/map', {
            longitude: infrastructure.longitude,
            latitude: infrastructure.latitude,
          })
        }
      >
        Voir sur la carte
      </Button>
    </div>
  );
};
