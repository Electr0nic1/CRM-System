import { redirect } from "react-router";
import { refresh } from "../api/api";

export async function checkAuthLoader () {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      const response = await refresh(refreshToken)

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      return null
  } catch (error) {
      localStorage.clear();
  }}

  return redirect('/auth?mode=signin')
}