import React from "react";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

import SignInForm from "../../components/SignInForm/SignInForm.tsx";
import store from "../../store/index.ts";
import { authActions } from "../../store/auth.ts";
import { signIn } from "../../api/auth.ts";
import TokenManager from "../../services/tokenManager.ts";
import type { UserLogin, AuthResponse } from "../../types/profile.ts";

const SignInPage: React.FC = () => {
  return <SignInForm />
};

export default SignInPage;

interface ActionResponse{
  success?: boolean;
  message?: React.ReactNode | string;
}

export async function action({ request }: ActionFunctionArgs) : Promise<Response | ActionResponse> {
  const data = await request.formData();

  const authData: UserLogin = {
    login: String(data.get('login') || ''),
    password: String(data.get('password') || ''),
  };

  const response: AuthResponse = await signIn(authData);

  const statusMessages: Record<number, string> = {
    400: 'Invalid input. Please try again.',
    401: 'Invalid credentials. Please try again.',
    500: 'An error occurred during authentication. Please try again later.',
  };

  const errorMessage = statusMessages[response.status];

  if (errorMessage) {
    return {
      success: false,
      message: errorMessage
    };
  }

  if ('token' in response && response.token) {
    TokenManager.setToken(response.token.accessToken);
    store.dispatch(authActions.authorize());
    localStorage.setItem('refreshToken', response.token.refreshToken);
  }

  return redirect('/')
}