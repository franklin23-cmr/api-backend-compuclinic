import {
  FaHands,
  FaLaptopMedical,
  FaReceipt,
  FaUserInjured,
} from 'react-icons/fa';

export const CaissierRoutes = [
  {
    icon: (clicked) => (
      <FaUserInjured
        color={clicked === 'patient' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/caissier/patient-attente',
    text: 'Patient En Attente',
    clicked: 'patient',
  },
  {
    icon: (clicked) => (
      <FaReceipt
        color={clicked === 'quittance' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/caissier/quittance',
    text: 'Quittance',
    clicked: 'quittance',
  },
  {
    icon: (clicked) => (
      <FaLaptopMedical
        color={clicked === 'tiaps' ? 'white' : 'black'}
        size={20}
      />
    ),
    link: '/caissier/tiaps',
    text: 'TIAPS',
    clicked: 'tiaps',
  },

  {
    icon: (clicked) => (
      <FaHands color={clicked === 'bons' ? 'white' : 'black'} size={20} />
    ),
    link: '/caissier/bons',
    text: 'BONS',
    clicked: 'bons',
  },
];
