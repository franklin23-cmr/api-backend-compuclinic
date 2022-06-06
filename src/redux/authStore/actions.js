import { AUTHENTICATE } from './actionTypes';

export const authentication = (token) => ({
  type: AUTHENTICATE,
  data: {
    access: token.access,
    refresh: token.refresh,
  },
});
