import { FaUserInjured, FaUserMd } from 'react-icons/fa';

export const InfirmiereRoutes = [
  
  {
    icon: (clicked) => (
      <FaUserMd
        color={clicked === 'patientAttente' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/infirmiere/patient-attente',
    text: 'Patient en Attente',
    clicked: 'patientAttente',
  },
  {
    icon: (clicked) => (
      <FaUserInjured
        color={clicked === 'listeparam' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/infirmiere/liste-parametres',
    text: 'Tous Les Paramètres',
    clicked: 'listeparam',
  },
];
