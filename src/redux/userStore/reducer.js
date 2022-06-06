import { CREATE_USER } from './actionTypes';

const INITIAL_STORE = {
  user: {
    authentifie: false,
    roles: [],
    id: '',
    nom: '',
    prenom: '',
    email: '',
    username: '',
    matricule: '',
    telephone: '',
    should_update_password: '',
    type_personnel: '',
    image: '',
    userId: '',
    nextAuthDate: 0,
  },
};

export const userReducer = (state = INITIAL_STORE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.data,
      };

    default:
      return state;
  }
};
