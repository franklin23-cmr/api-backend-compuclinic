import {
  FaClipboardList,
  FaHands,
  FaRegCalendarAlt,
  FaStethoscope,
  FaUserInjured,
} from 'react-icons/fa';

export const MedecinRoutes = [
  {
    icon: (clicked) => (
      <FaRegCalendarAlt
        color={clicked === 'emploi' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/medecin/emploi-temps',
    text: 'Emploi du Temps',
    clicked: 'emploi',
  },
  {
    icon: (clicked) => (
      <FaUserInjured
        color={clicked === 'patient' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/medecin/patient',
    text: "File d'attente",
    clicked: 'patient',
  },
  /*  {
    icon: (clicked) => (
      <FaHeartbeat
        color={clicked === 'mesconsult' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/medecin/consultations',
    text: 'Mes Consultations',
    clicked: 'mesconsult',
  }, */

  {
    icon: (clicked) => (
      <FaStethoscope
        color={clicked === 'consult' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/medecin/mes-consultations',
    text: 'Toutes mes consultations',
    clicked: 'consult',
  },

  {
    icon: (clicked) => (
      <FaClipboardList
        color={clicked === 'allpatient' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/medecin/tous-les-patients',
    text: 'Tous les Patients',
    clicked: 'allpatient',
  },
  {
    icon: (clicked) => (
      <FaHands color={clicked === 'bons' ? 'white' : 'black'} size={20} />
    ),
    link: '/medecin/bons',
    text: 'BONS',
    clicked: 'bons',
  },
];
