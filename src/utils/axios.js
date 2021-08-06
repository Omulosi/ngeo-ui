import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
// import { throttleAdapterEnhancer } from 'axios-extensions';
import BASE_URL from 'src/config';
import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 2 * 60 * 60 * 1000
});

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  });
};

export const axiosWithoutAuth = () => {
  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const axiosGeneral = () => {
  return axios.create({
    // headers: { 'Cache-Control': 'no-cache' },
    // Wait for 2 hrs before issuing another call
    adapter: cache.adapter
  });
};

export const useAxios = () => {
  const token = localStorage.getItem('token');

  return makeUseAxios({
    axios: axios.create({
      baseURL: `${BASE_URL}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
  });
};
