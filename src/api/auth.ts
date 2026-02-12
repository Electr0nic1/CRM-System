import axios from 'axios'

import { api } from './axiosInstance'
import type { UserRegistration, UserLogin, Token, AuthResponse } from '../types/profile'

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
    console.error(error)
    throw error
  }
}



export async function logout(): Promise<void> {
  try {
    await api.post('/user/logout')
  } catch (error) {
    console.error(error)
  } 
}