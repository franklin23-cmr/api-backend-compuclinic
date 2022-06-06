import { notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getHours, getMinutes } from '../../../shared/DateToFrench';
import { Scheduler } from '../../../shared/Scheduler';
import { GrhBaseLayout } from '../components/grhBaseLayout';
import { getPersonnel, submitPlanning } from '../network/grh.network';

export const GestionPlanning = () => {
  const [personnels, setPersonnels] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);

  useEffect(() => {
    getPersonnel().then((data) => setPersonnels(data.result));
  }, []);

  const getTime = (date) => {
    const d = new Date(date);
    return `${getHours(d)}:${getMinutes(d)}`;
  };

  const getDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const onSubmit = (planning) => {
    for (let plan of planning) {
      if (plan) {
        const dataToPost = {
          sujet: plan.sujet,
          description: plan.description,
          localisation: plan.localisation,
          personnel: selectedPersonnel,
          heure_debut: getTime(plan.heure_debut),
          heure_fin: getTime(plan.heure_fin),
          date: getDate(plan.heure_debut),
        };

        submitPlanning(dataToPost).then((data) => {
          if (data?.result.id) {
            notification.success({
              message: 'Succès',
              description: 'Le planning a été enregistré avec succès',
            });
          } else {
            notification.error({
              message: 'Echec',
              description: "Une erreur s'est produite",
            });
          }
        });
      }
    }
  };

  return (
    <GrhBaseLayout clicked={'planning'}>
      <h5>Organisez le planning du personnel</h5>
      <Select
        style={{ width: 400 }}
        size='large'
        placeholder='personnel'
        onChange={(value) => setSelectedPersonnel(value)}
      >
        {personnels.map((personnel) => (
          <Select.Option value={personnel.id} key={personnel.id}>
            {personnel.nom} {personnel.prenom} : {personnel.type_personnel}
          </Select.Option>
        ))}
      </Select>
      <Scheduler
        dataSource={[]}
        allowModif={true}
        height={800}
        onSubmit={onSubmit}
      />
    </GrhBaseLayout>
  );
};
