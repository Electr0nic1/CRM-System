import axios, { AxiosError } from 'axios'

import store from '../store/index.ts'
import TokenManager from '../services/tokenManager.ts'
import { API_URL } from '../helpers/config.ts'
import { authActions } from '../store/auth.ts'
import { refresh } from './auth.ts'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

api.interceptors.request.use(config => {
  const isProtected = !['/auth/signin', '/auth/signup', '/auth/refresh'].includes(config.url || '')
  const token = TokenManager.getToken()

  if (isProtected && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: AxiosError) => void }[] = [];

function processQueue(error: AxiosError | null, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else if (error) {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.config?.url?.includes('/auth/signin') || error.config?.url?.includes('/auth/signup')) {
      return Promise.reject(error);
    }

    if (error.config?.url?.includes('/auth/refresh') && error.response?.status === 401) {
      return Promise.reject(new AxiosError('Unauthorized'));
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          return Promise.reject(new AxiosError('Unauthorized'));
        }

        const data = await refresh(refreshToken);

        TokenManager.setToken(data.accessToken);
        store.dispatch(authActions.authorize());
        localStorage.setItem('refreshToken', data.refreshToken);

        api.defaults.headers.common['Authorization'] = 'Bearer ' + TokenManager.getToken();

        processQueue(null, TokenManager.getToken());

        originalRequest.headers['Authorization'] = 'Bearer ' + TokenManager.getToken();
        
        return api(originalRequest);
      } catch (error) {
        if (axios.isAxiosError(error) ) {
          processQueue(error, null);
        }

        return Promise.reject(new AxiosError('Unauthorized'));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
