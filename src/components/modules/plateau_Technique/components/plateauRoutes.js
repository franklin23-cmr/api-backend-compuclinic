import { FaBuilding, FaCog, FaSave, FaServicestack } from 'react-icons/fa';

export const PlateauRoutes = [
  {
    icon: (clicked) => (
      <FaBuilding
        color={clicked === 'infrastructures' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/plateau/infrastructures',
    text: 'Infrastructures',
    clicked: 'infrastructures',
  },
  {
    icon: (clicked) => (
      <FaCog color={clicked === 'equipements' ? 'white' : 'black'} size={20} />
    ),
    link: '/plateau/equipements',
    text: 'Equipements',
    clicked: 'equipements',
  },
  {
    icon: (clicked) => (
      <FaServicestack
        color={clicked === 'services' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/plateau/services',
    text: 'Services',
    clicked: 'services',
  },
  {
    icon: (clicked) => (
      <FaSave
        color={clicked === 'enregistrement' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/plateau/enregistrement',
    text: 'Paramétrage',
    clicked: 'enregistrement',
  },
];
