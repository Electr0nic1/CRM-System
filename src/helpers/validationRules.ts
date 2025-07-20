import type { RuleObject } from "antd/es/form";
import {USERNAME_INPUT_LENGTH, LOGIN_INPUT_LENGTH, PASSWORD_INPUT_LENGTH} from "./constants";

export const usernameRules = [
{
  required: true,
  message: 'Username is required',
},
{
  min: USERNAME_INPUT_LENGTH.MIN,
  message: `Username must be at least ${USERNAME_INPUT_LENGTH.MIN} characters`,
},
{
  max: USERNAME_INPUT_LENGTH.MAX,
  message: `Username cannot exceed ${USERNAME_INPUT_LENGTH.MAX} characters`,
},
{
  pattern: /^[A-Za-zА-Яа-яЁё]+$/,
  message: 'Username must contain only letters',
}]

export const loginRules = [
{
  required: true,
  message: 'Login is required',
},
{
  min: LOGIN_INPUT_LENGTH.MIN,
  message: `Login must be at least ${LOGIN_INPUT_LENGTH.MIN} characters`,
},
{
  max: LOGIN_INPUT_LENGTH.MAX,
  message: `Login cannot exceed ${LOGIN_INPUT_LENGTH.MAX} characters`,
},
{
  pattern: /^[A-Za-z]+$/,
  message: 'Login must contain only english letters',
}]

export const passwordRules = [
{
  required: true,
  message: 'Password is required',
},
{
  min: PASSWORD_INPUT_LENGTH.MIN,
  message: `Password must be at least ${PASSWORD_INPUT_LENGTH.MIN} characters`,
},
{
  max: PASSWORD_INPUT_LENGTH.MAX,
  message: `Password cannot exceed ${PASSWORD_INPUT_LENGTH.MAX} characters`,
}
]

export const confirmPasswordRules = [
{
  required: true,
  message: 'Password confirmation is required',
},
({ getFieldValue } : any) => ({
  validator(_: RuleObject, value: any) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Two passwords do not match'));
  },
})]

export const emailRules = [
{
  required: true,
  message: 'Email is required',
},
{
  pattern: /^[a-zA-Zа-яА-ЯёЁ0-9]+@[a-zA-Zа-яА-ЯёЁ]+\.[a-zA-Zа-яА-ЯёЁ]+$/,
  message: 'Email must be a valid email address',
}
]

export const phoneNumberRules = [
{
  pattern: /^\+?\d{11,14}$/,
  message: 'Phone must be a valid phone number',
}];