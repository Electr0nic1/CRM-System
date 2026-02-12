import React from "react";
import { Link } from "react-router";
import type { ActionFunctionArgs } from "react-router";

import SignUpForm from "../../components/SignUpForm/SignUpForm.tsx";
import { signUp } from "../../api/auth.ts";
import type { UserRegistration, AuthResponse } from "../../types/profile.ts";

const SignUpPage: React.FC = () => {
  return <SignUpForm />
};

export default SignUpPage;

interface ActionResponse{
  success?: boolean;
  message?: React.ReactNode | string;
}

export async function action({ request }: ActionFunctionArgs) : Promise<Response | ActionResponse> {
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
  
  const response: AuthResponse = await signUp(registrationData);

  const statusMessages: Record<number, string> = {
    400: 'Invalid input. Please try again.',
    404: 'User not found. Please try signing up.',
    409: 'User already exists. Please try logging in.',
    500: 'An error occurred during authentication. Please try again later.',
  };

  const errorMessage = statusMessages[response.status];

  if (errorMessage) {
    return {
      success: false,
      message: errorMessage
    };
  }

  return {
    success: true,
    message: (<>Successfully. Go to the <Link to="/auth/signin">authorization page</Link> to log in</>)
  };
}