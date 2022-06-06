import {
  FaAddressBook,
  FaBed,
  FaClipboardCheck,
  FaClipboardList,
  FaCog,
  FaUserInjured,
  FaUserMd,
} from 'react-icons/fa';

export const SecretaireRoutes = [
  {
    icon: (clicked) => (
      <FaAddressBook
        color={clicked === 'patient' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/secretaire/inscription-patient',
    text: 'Inscrition Patient',
    clicked: 'patient',
  },
  {
    icon: (clicked) => (
      <FaUserInjured
        color={clicked === 'patientList' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/secretaire/liste-patients',
    text: 'Liste Patients',
    clicked: 'patientList',
  },
  {
    icon: (clicked) => (
      <FaClipboardList
        color={clicked === 'listPresence' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/secretaire/liste-presence',
    text: 'Liste Presence',
    clicked: 'listPresence',
  },
  {
    icon: (clicked) => (
      <FaBed
        color={clicked === 'listInternement' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/secretaire/liste-internement',
    text: 'Liste Internements',
    clicked: 'listInternement',
  },
  {
    icon: (clicked) => (
      <FaClipboardCheck
        color={clicked === 'listRdv' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/secretaire/rendez-vous',
    text: 'Liste des RDV',
    clicked: 'listRdv',
  },
  {
    icon: (clicked) => (
      <FaCog color={clicked === 'equipements' ? 'white' : 'black'} size={20} />
    ),
    link: '/secretaire/equipements',
    text: 'Equipements',
    clicked: 'equipements',
  },
  {
    icon: (clicked) => (
      <FaUserMd color={clicked === 'personnel' ? 'white' : 'black'} size={20} />
    ),
    link: '/secretaire/personnel',
    text: 'Personnel',
    clicked: 'personnel',
  },
];
