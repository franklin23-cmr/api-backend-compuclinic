import {
  FaRegCalendarAlt,
  FaStethoscope,
  //FaStethoscope,
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
    link: '/laborantin/emploi-temps',
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
    link: '/laborantin/examen_encours',
    text: 'examen en attente',
    clicked: 'patient',
  },

  // {
  //   icon: (clicked) => (
  //     <FaUserInjured
  //       color={clicked === 'patient' ? 'black' : 'white'}
  //       size={20}
  //     />
  //   ),
  //   link: '/laborantin/liste-prescription',
  //   text: 'liste prescription',
  //   clicked: 'patient',
  // },

  {
    icon: (clicked) => (
      <FaStethoscope
        color={clicked === 'consult' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/laborantin/liste-prescription',
    text: 'liste prescription',
    clicked: 'consult',
  },

  // {
  //   icon: (clicked) => (
  //     <FaClipboardList
  //       color={clicked === 'allpatient' ? 'white' : 'black'}
  //       size={20}
  //     />
  //   ),
  //   link: '/medecin/tous-les-patients',
  //   text: 'Tous les Patients',
  //   clicked: 'allpatient',
  // },
  // {
  //   icon: (clicked) => (
  //     <FaHands color={clicked === 'bons' ? 'white' : 'black'} size={20} />
  //   ),
  //   link: '/medecin/bons',
  //   text: 'BONS',
  //   clicked: 'bons',
  // },
];
