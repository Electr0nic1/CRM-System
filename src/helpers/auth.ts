import { redirect } from "react-router-dom";
import { refresh } from "../api/api";

export function getAccessToken () {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null
  }

  return token
}

export function getRefreshToken () {
  const token = localStorage.getItem('refreshToken');

  if (!token) {
    return null
  }

  return token
}

export function tokenLoader () {
  return getAccessToken()
}


export async function checkAuthLoader () {
  const token = getAccessToken()

  if (token) {
    console.log('[checkAuthLoader] ✅ accessToken OK')
    return null
  }

  const refreshToken = getRefreshToken()
  
  console.log('[checkAuthLoader] start')
  console.log('→ accessToken =', token)
  console.log('→ refreshToken =', refreshToken)

  if (refreshToken) {
        console.log('[checkAuthLoader] 🔁 trying to refresh...')
    try {
      const response = await refresh(refreshToken)

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      console.log('[checkAuthLoader] ✅ Token refreshed')
      return null
  } catch (error) {
      console.error('Error refreshing token:', error);
      // localStorage.clear();
  }}

  
  console.log('[checkAuthLoader] 🔴 Redirecting to /auth')
  return redirect('/auth?mode=signin')
}

// new Response('Unauthorized', {
//     status: 401,
//     statusText: 'You must be logged in to access this page.'
//   })