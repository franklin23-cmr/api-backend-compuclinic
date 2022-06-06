import { Card, Image, Space, Tooltip } from 'antd';
import { FaBook, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import building from '../../../../assets/images/building.svg';

export const CardInfos = ({ infrastructure, personnel }) => {
  const history = useHistory();
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        zoom: 0.9,
      }}
      hoverable
      cover={
        infrastructure ? (
          <Image
            alt='infrastructure'
            src={infrastructure.image || building}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        ) : (
          <Image
            alt='personnel'
            src={personnel.image || building}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        )
      }
      actions={
        infrastructure
          ? [
              <Tooltip title='détails de la structure' placement='right'>
                <FaBook
                  size={18}
                  onClick={() =>
                    history.push('/plateau-technique-public/structure', {
                      infrastructure: infrastructure,
                    })
                  }
                />
              </Tooltip>,
              <Tooltip title='visualiser sur une carte' placement='right'>
                <FaMapMarkedAlt
                  size={18}
                  onClick={() =>
                    history.push('/plateau-technique-public/map', {
                      longitude: infrastructure.longitude,
                      latitude: infrastructure.latitude,
                    })
                  }
                />
              </Tooltip>,
            ]
          : []
      }
    >
      {infrastructure && (
        <>
          <h6 className='card-title'>{infrastructure?.nom}</h6>
          <p className='card-localisation'>
            {infrastructure?.localisation}, {infrastructure?.ville}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space style={{ alignItems: 'center' }}>
              <FaPhoneAlt size={13} style={{ marginTop: -5 }} />
              <p className='card-contact'>{infrastructure?.telephone}</p>
            </Space>
            <p className='card-class'>Classe : {infrastructure?.classe}</p>
          </div>
        </>
      )}
      {personnel && (
        <>
          <h6 className='card-title'>
            {personnel?.nom} {personnel?.prenom}
          </h6>
          <p className='card-localisation'>{personnel?.type_personnel}</p>
          <p className='card-localisation'>{personnel?.email}</p>
          <Space style={{ alignItems: 'center' }}>
            <FaPhoneAlt size={13} style={{ marginTop: -5 }} />
            <p className='card-contact'>{personnel?.telephone}</p>
          </Space>
        </>
      )}
    </Card>
  );
};
