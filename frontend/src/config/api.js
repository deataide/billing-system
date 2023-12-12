import axios from 'axios';
import { getUserLocalStorage } from '../context/AuthProvider/util';

export const api = axios.create({
  baseURL: 'http://localhost:3001/',
});
export const apiWithToken = axios.create({
  baseURL: 'http://localhost:3001/',
});


 apiWithToken.interceptors.request.use(
  function (config) {
    const user = getUserLocalStorage();

    if(user?.token){
      config.headers.Authorization = `Bearer ${user?.token}`
    }


    return config

  },
  function (error) {
    return Promise.reject(error);
  }
);
