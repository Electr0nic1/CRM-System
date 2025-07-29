import React from "react";
import { Link, redirect } from "react-router";
import type {ActionFunctionArgs} from "react-router";

import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import store from "../../store/index.ts";
import { authActions } from "../../store/auth.ts";
import { signIn, signUp } from "../../api/api.ts";
import { TokenManager } from "../../services/tokenManager.ts";
import type { UserRegistration, UserLogin, AuthResponse } from "../../types/index.ts";

const Authentication: React.FC = () => {
  return <AuthForm />
};

export default Authentication;

interface ActionResponse{
  success?: boolean;
  message?: React.ReactNode | string;
}

export async function action({ request }: ActionFunctionArgs) :Promise<Response | ActionResponse> {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'signin';

  if (mode !== 'signin' && mode !== 'signup') {
    return {
      success: false,
      message: 'Unsupported mode.'
    }
  }

  const data = await request.formData();

  const registrationData: UserRegistration = {
    email: String(data.get('email') || ''),
    username: String(data.get('username') || ''),
    login: String(data.get('login') || ''),
    password: String(data.get('password') || ''),
  };

  const phoneNumber = data.get('phoneNumber');
  if (typeof phoneNumber === 'string' && phoneNumber.trim() !== '') {
    registrationData['phoneNumber'] = '+' + phoneNumber;
  }

  const authData: UserLogin = {
    login: String(data.get('login') || ''),
    password: String(data.get('password') || ''),
  };
  
  const response: AuthResponse = mode === 'signin' ? await signIn(authData) : await signUp(registrationData);


  const statusMessages: Record<number, string> = {
    409: 'User already exists. Please try logging in.',
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

  if (response.status === 200 && mode === 'signin') {
    return redirect('/')
  }

  return {
    success: true,
    message: (<>Successfully. Go to the <Link to="/auth?mode=signin">authorization page</Link> to log in</>)
  };
}