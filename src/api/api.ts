import axios, { AxiosError } from 'axios'

import { API_URL } from '../helpers/config.ts'
import store from '../store/index.ts'
import { authActions } from '../store/auth.ts'
import { TokenManager } from '../services/tokenManager.ts'
import type { Todo, TodoInfo, TaskCategory, UserRegistration, UserLogin, Token, Profile, AuthResponse } from '../types/index.ts'

const forceLogout = () => {
  localStorage.removeItem('refreshToken');
  TokenManager.clearToken();
  store.dispatch(authActions.unauthorize());
  window.location.href = '/auth?mode=signin';
}

const api = axios.create({
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

    if (error.config?.url?.includes('/auth/refresh') && error.response?.status === 401) {
      forceLogout();
      return Promise.reject(error);
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
        let refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          forceLogout();  
          return Promise.reject(error);
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

        forceLogout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export async function getTasks(status: TaskCategory = 'all'): Promise<{ data: Todo[]; info: TodoInfo }> {
  try {
    const response = await api.get('/todos', {
      params: { filter: status },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function createTask(title: string): Promise<Todo> {
  try {
    const response = await api.post('/todos', {
      isDone: false,
      title: title,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteTask(id: number): Promise<string> {
  try {
    const response = await api.delete(`/todos/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateTask(task: Todo): Promise<Todo> {
  try {
    const response = await api.put(`/todos/${task.id}`, {
      isDone: task.isDone,
      title: task.title,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function signUp(registrationData: UserRegistration): Promise<{ status: number }> {
  try {
    const response = await api.post('/auth/signup', registrationData)
    return {
      status: response.status
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status
      }
    }

    return {
      status: 500
    }
  }
}

export async function signIn(authData: UserLogin): Promise<AuthResponse> {
  try {
    const response = await api.post('/auth/signin', authData)
    return {
      status: response.status,
      token: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status
      }
    }

    return {
      status: 500
    }
  }
}

export async function refresh(refreshToken: string): Promise<Token> {
  try {
    const response = await api.post('/auth/refresh', {
      refreshToken: refreshToken,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function getProfile(): Promise<Profile> {
  try {
    const response = await api.get('/user/profile')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/user/logout')
  } catch (error) {
    throw error
  } finally {
    forceLogout();
  }
}