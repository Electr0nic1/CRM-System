import { api } from './axiosInstance'
import type { Profile } from '../types/profile'

export async function getProfile(): Promise<Profile> {
  try {
    const response = await api.get('/user/profile')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}