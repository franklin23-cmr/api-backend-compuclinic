import { Timeline } from 'antd';
import { getAge } from '../../../../shared/DateToFrench';

export const CustomTimeline = ({ infras }) => {
  return (
    <Timeline style={{ marginTop: 20 }}>
      <Timeline.Item>
        Classe : <span style={{ fontWeight: 'bold' }}>{infras.classe}</span>
      </Timeline.Item>
      <Timeline.Item>
        Ville : <span style={{ fontWeight: 'bold' }}>{infras.ville}</span>
      </Timeline.Item>
      <Timeline.Item>
        Localisation :{' '}
        <span style={{ fontWeight: 'bold' }}>{infras.localisation}</span>
      </Timeline.Item>
      <Timeline.Item>
        Email : <span style={{ fontWeight: 'bold' }}>{infras.email}</span>
      </Timeline.Item>
      <Timeline.Item>
        Téléphone :{' '}
        <span style={{ fontWeight: 'bold' }}>{infras.telephone}</span>
      </Timeline.Item>
      <Timeline.Item>
        Age :{' '}
        <span style={{ fontWeight: 'bold' }}>
          {getAge(infras.date_creation)}
        </span>
      </Timeline.Item>
      <Timeline.Item>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: 2 }}>Site Web : </span>
          <p
            style={{
              width: 110,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <a href={infras.site_web}>{infras.site_web}</a>
          </p>
        </div>
      </Timeline.Item>
    </Timeline>
  );
};
