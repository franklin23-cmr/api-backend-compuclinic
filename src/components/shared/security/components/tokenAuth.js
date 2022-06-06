import { API_URL } from '../../API_URLS';
import { customFetch } from '../../customFetch';

export const tokenAuthentication = async (username, password) => {
  const dataToPost = { username, password };
  return await customFetch.post(API_URL.AUTH.GET_TOKEN, dataToPost);
};

export const updateToken = async (refresh) => {
  const dataToPost = { refresh };
  return await customFetch
    .post(API_URL.AUTH.REFRESH_TOKEN, dataToPost)
    .then((result) => {
      if (result.access) {
        //dans le cas ou le refresh token est encore valide (<=24h)
        let tokens = {
          access: result.access,
          refresh: refresh,
        };
        return tokens;
      } else {
        //dans le cas ou le refresh token n'est plus valide (>24h)
        //il doit se reconnecter sur la page de login
        let login = { login: true };
        return login;
      }
    });
};
