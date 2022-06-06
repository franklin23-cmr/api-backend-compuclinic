import { Timeline } from 'antd';
import { useEffect, useState } from 'react';
import { getInfrastructureLit } from '../../plateau_Technique/network/plateauTechnique.network';

export const PlateauView = ({ infrastructure }) => {
  const [composant, setComposant] = useState({});

  useEffect(() => {
    getInfrastructureLit(infrastructure.id).then((data) => {
      setComposant(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Timeline style={{ margin: 20, fontFamily: 'Tauri', height: '90vh' }}>
      <Timeline.Item>
        Batiments : <strong>{composant.batiments}</strong>
      </Timeline.Item>
      <Timeline.Item>
        Locaux : <strong>{composant.locaux}</strong>
      </Timeline.Item>
      <Timeline.Item>
        Matériel Informatique :{' '}
        <strong>{composant.materiels?.Informatique}</strong>
      </Timeline.Item>
      <Timeline.Item>
        Matériel Médical : <strong>{composant.materiels?.Médical}</strong>
      </Timeline.Item>
      <Timeline.Item>
        Matériel Electronique :{' '}
        <strong>{composant.materiels?.Electronique}</strong>
      </Timeline.Item>
      <Timeline.Item>
        Ambulances :{' '}
        <strong>{composant.equipements?.["Équipement d'ambulance"]}</strong>
      </Timeline.Item>
      <Timeline.Item>
        Spécialités Médicales: <strong>{composant.services}</strong>
      </Timeline.Item>
    </Timeline>
  );
};
