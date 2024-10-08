import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/store/authStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_TIMEOUT = 30000;
let hasAlerted = false;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (request) => {
      const token = getToken();
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, config } = error.response;

        if (status === 401) {
          const isLoginRequest = config.url.includes('/login');

          if (!isLoginRequest) {
            if (!hasAlerted) {
              alert('세션이 만료되었습니다. 다시 로그인해주세요.');
              hasAlerted = true;
            }
            removeToken();
            window.location.href = '/login';
          }
          return Promise.reject('Unauthorized');
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
