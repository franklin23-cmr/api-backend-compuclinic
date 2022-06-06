import { AUTHENTICATE } from './actionTypes';

const INITIAL_STORE = {
  token: {
    access: '',
    refresh: '',
  },
};

export const authReducer = (state = INITIAL_STORE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.data,
      };

    default:
      return state;
  }
};
