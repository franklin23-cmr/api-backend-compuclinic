import {
  FaAddressBook,
  FaClipboardList,
  FaUserMd,
  FaUsersCog,
} from 'react-icons/fa';

export const GrhRoutes = [
  {
    icon: (clicked) => (
      <FaAddressBook
        color={clicked === 'employe' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/grh/inscription-personnel',
    text: 'Nouveau Personnel',
    clicked: 'employe',
  },
  {
    icon: (clicked) => (
      <FaUserMd color={clicked === 'personnel' ? 'white' : 'black'} size={20} />
    ),
    link: '/grh/personnel',
    text: 'Personnel',
    clicked: 'personnel',
  },
  {
    icon: (clicked) => (
      <FaClipboardList
        color={clicked === 'planning' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/grh/planning',
    text: 'Gestion des plannings',
    clicked: 'planning',
  },
  {
    icon: (clicked) => (
      <FaUsersCog color={clicked === 'profil' ? 'white' : 'black'} size={20} />
    ),
    link: '/grh/profil',
    text: 'Gestion des profils',
    clicked: 'profil',
  },
];
