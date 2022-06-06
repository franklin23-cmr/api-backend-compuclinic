export const customFetch = {
  get: async (url) => {
    return fetch(url).then((res) => res.json());
  },
  post: async (url, dataToPost) => {
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToPost),
    }).then((res) => res.json());
  },
  patch: async (url, dataToPost) => {
    return fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToPost),
    }).then((res) => res.json());
  },

  update: async (url, dataToPost) => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToPost),
    }).then((res) => res.json());
  },

  getWithToken: async (url, accessToken) => {
    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  },
  postwithToken: async (url, dataToPost, accessToken) => {
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToPost),
    }).then((res) => res.json());
  },

  patchwithToken: async (url, dataToPost, accessToken) => {
    return fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToPost),
    }).then((res) => res.json());
  },
};
