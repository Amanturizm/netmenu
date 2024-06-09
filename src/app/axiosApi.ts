import axios, { AxiosHeaders } from 'axios';
import { apiUrl } from './constants';
import { User } from '@/app/types';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

axiosApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') as string) as User;
  if (!user) return config;

  const token = user.token;
  const headers = config.headers as AxiosHeaders;
  headers.set('Authorization', token);

  return config;
});

export default axiosApi;
