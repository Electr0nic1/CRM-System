import React from "react";
import { Link, redirect } from "react-router";
import type {ActionFunctionArgs} from "react-router";
import AuthForm from "../../components/AuthForm/AuthForm";

import {authenticateUser} from "../../api/api";
import type {UserRegistration} from "../../types/index.ts";

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
  const authData: Partial<UserRegistration> = {
    email: data.get('email') as string ?? "",
    username: data.get('username') as string ?? "",
    login: data.get('login') as string ?? "",
    password: data.get('password') as string ?? "",
  };

  const phoneNumber = data.get('phoneNumber');
  if (typeof phoneNumber === 'string' && phoneNumber.trim() !== '') {
    authData['phoneNumber'] = '+' + phoneNumber;
  }

  const response = await authenticateUser(authData, mode);

  if (response.status === 409) {
    return {
      success: false,
      message: 'User already exists. Please try logging in.'
    };
  }

  if (response.status === 400) {
    return {
      success: false,
      message: 'Invalid input. Please try again.'
    };
  }

  if (response.status === 401) {
    return {
      success: false,
      message: 'Invalid credentials. Please try again.'
    };
  }

  if (response.status === 500) {
    return {
      success: false,
      message: 'An error occurred during authentication. Please try again later.'
    };
  }

  if ('token' in response) {
    const token = response.token;
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  }

  if (response.status === 200 && mode === 'signin') {
    return redirect('/')
  }

  return {
    success: true,
    message: (<>Successfully. Go to the <Link to="/auth?mode=signin">authorization page</Link> to log in</>)
  };
}