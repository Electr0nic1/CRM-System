import { API_URL } from '../helpers/config.ts'
import axios from 'axios'

import type { Todo, TodoInfo, TaskCategory, UserRegistration, Token, Profile } from '../types/index.ts'
import store from '../store/index.ts'
import { authActions } from '../store/auth.ts'

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

api.interceptors.request.use(config => {
  const isProtected = !['/auth/signin', '/auth/signup', '/auth/refresh'].includes(config.url || '')
  const token = store.getState().auth.accessToken

  if (isProtected && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  response => {
    return response
    },
  async error => {
    const originalRequest = error.config;

    if (error.config?.url?.includes('/auth/refresh') && error.response?.status === 401) {
      localStorage.clear();
      store.dispatch(authActions.removeAccessToken());
      window.location.href = '/auth?mode=signin';
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
          localStorage.clear();
          store.dispatch(authActions.removeAccessToken());
          window.location.href = '/auth?mode=signin';
          return Promise.reject(error);
        }

        const data = await refresh(refreshToken as string);

        store.dispatch(authActions.setAccessToken({ accessToken: data.accessToken }));
        localStorage.setItem('refreshToken', data.refreshToken);

        api.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;

        processQueue(null, data.accessToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
        
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.clear();
        store.dispatch(authActions.removeAccessToken());
        window.location.href = '/auth?mode=signin';
        return Promise.reject(err);
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

type AuthResponse = {
  token: Token;
  status: number;
} | {
  user: Profile;
  status: number;
} | {
  message: string;
  status: number;
}

export async function authenticateUser(authData: Partial<UserRegistration>, mode: 'signin' | 'signup'): Promise<AuthResponse> {
  try {
    const response = await api.post(`/auth/${mode}`, authData)

    if (mode === 'signin') {
      return {
        token: {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        },
        status: response.status,
      }
    } else {
      return {
        user: response.data,
        status: response.status,
      }
    }
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Authentication failed' 
    const status = error.response?.status || 500

    return { message, status }
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
    localStorage.clear()
    store.dispatch(authActions.removeAccessToken());
    window.location.href = '/auth?mode=signin'
  }
}