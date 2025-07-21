import { redirect } from "react-router";

import store from "../store";
import { authActions } from "../store/auth";
import { refresh } from "../api/api";

export async function checkAuthLoader () {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      const response = await refresh(refreshToken)

      store.dispatch(authActions.setAccessToken({ accessToken: response.accessToken }));
      localStorage.setItem('refreshToken', response.refreshToken);

      return null
  } catch (error) {
      localStorage.clear();
      store.dispatch(authActions.removeAccessToken());
  }}

  return redirect('/auth?mode=signin')
}