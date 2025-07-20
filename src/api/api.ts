import { API_URL } from '../helpers/config.ts'
import axios from 'axios'
import type { Todo, TodoInfo, TaskCategory, UserRegistration, Token, Profile } from '../types/index.ts'

const api = axios.create({
  baseURL: API_URL,
  // timeout: 5000,
})

api.interceptors.request.use(config => {
  const isProtected = !['/auth/signin', '/auth/signup', '/auth/refresh'].includes(config.url || '')
  const token = localStorage.getItem('accessToken')

  if (isProtected && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// let isRefreshing = false;
// let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

// api.interceptors.response.use(
//   response => {
//     console.log('Response received:', response)
//     return response
//     },
//   async error => {
//     const originalRequest = error.config;
//     console.log('Request made with ', error.config);

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       console.log('Refreshing token...');
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers['Authorization'] = 'Bearer ' + token;
//           return api(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const { data } = await api.post('/auth/refresh', { refreshToken: refreshToken });

//         localStorage.setItem('accessToken', data.accessToken);

//         originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

//         failedQueue.forEach(prom => prom.resolve(data.accessToken));
//         failedQueue = [];
//         isRefreshing = false;

//         return api(originalRequest);
//       } catch (err) {
//         failedQueue.forEach(prom => prom.reject(err));
//         failedQueue = [];
//         isRefreshing = false;

//         localStorage.clear();
//         window.location.href = '/auth?mode=signin';
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

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
    console.error('Authentication error:', error);
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
