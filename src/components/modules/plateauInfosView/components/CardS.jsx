import { Card, Tooltip } from 'antd';
import { FaBook } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import specialite from '../../../../assets/images/cardio.jpg';

export const CardS = ({ service }) => {
  const history = useHistory();
  return (
    <div>
      <Card
        style={{
          width: 300,
          margin: 10,
          zoom: 0.9,
        }}
        hoverable
        cover={
          <img
            alt='infrastructure'
            src={service.image || specialite}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        }
        actions={[
          <Tooltip title='détails du service' placement='right'>
            <FaBook
              size={18}
              onClick={() =>
                history.push('/plateau-technique-public/structure', {
                  service: service,
                })
              }
            />
          </Tooltip>,
        ]}
      >
        <h6 className='card-title'>{service?.nom}</h6>
      </Card>
    </div>
  );
};
