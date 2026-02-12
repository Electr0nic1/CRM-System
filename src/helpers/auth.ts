import { redirect } from "react-router";

import store from "../store/index.ts";
import { authActions } from "../store/auth.ts";
import { refresh } from "../api/auth.ts";
import TokenManager from "../services/tokenManager.ts";

export async function checkAuthLoader () {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      const response = await refresh(refreshToken)

      TokenManager.setToken(response.accessToken);
      store.dispatch(authActions.authorize());
      localStorage.setItem('refreshToken', response.refreshToken);

      return null
  } catch (error) {
      console.error(error)
      localStorage.removeItem('refreshToken');
      TokenManager.clearToken();
      store.dispatch(authActions.unauthorize());
  }}

  return redirect('/auth/signin')
}