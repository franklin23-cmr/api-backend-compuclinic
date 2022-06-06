import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { GrhBaseLayout } from '../components/grhBaseLayout';
import { ProfilCard } from '../components/ProfilCard';
import '../css/profilCard.css';
import { getGroups, getPersonnel } from '../network/grh.network';

export const GestionProfil = () => {
  const [personnels, setPersonnels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const syncExecute = async () => {
    await getPersonnel().then((data) => {
      setPersonnels(data.result);
    }, []);
    await getGroups().then((data) => {
      let groupss = [];
      for (let group of data?.result) {
        groupss.push({ value: group.id, label: group.name });
      }
      setGroups(groupss);
      setIsLoading(false);
    });
  };

  useEffect(() => syncExecute(), []);

  return (
    <GrhBaseLayout clicked={'profil'}>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BeatLoader loading={isLoading} size={30} color='#417ef7' />
        </div>
      ) : (
        <div className='profils'>
          {personnels.map((personnel) => (
            <ProfilCard
              key={personnel.id}
              personnel={personnel}
              groups={groups}
              refreshRequest={() => syncExecute()}
            />
          ))}
        </div>
      )}
    </GrhBaseLayout>
  );
};
