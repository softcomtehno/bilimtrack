import axios from 'axios';
import {
  ActivationData,
  CreateUserSchema,
  EditUserProfile,
  LoginUserDto,
  SendEmail,
  TokensDtoSchema,
  UpdatePassword,
  UserDtoSchema,
} from './user.types';
import $api from '~shared/api';

const API = 'https://api.makalabox.com/api/users';

export function getTokenMutation(params: { user: LoginUserDto }) {
  return $api.post<TokensDtoSchema>('jwt/create/', params.user);
}

export function loginUserQuery() {
  return $api.get<UserDtoSchema>('users/me');
}

export function registerUserMutation(params: { user: CreateUserSchema }) {
  return $api.post('users/', params.user);
}

export function emailActivationMutation(params: { data: ActivationData }) {
  return $api.post('users/activation/', params.data);
}

export function editUserProfile(params: { user: EditUserProfile }) {
  return $api.patch('users/me/', params.user);
}

export function resetPasswordEmail(params: { email: SendEmail }) {
  return axios.post(`${API}/reset_password/`, params.email);
}

export function resetPasswordConfirm(params: { data: UpdatePassword }) {
  return axios.post(`${API}/reset_password_confirm/`, params.data);
}

export function getPerfomanceChart() {
  return $api.get('perfomance-chart/me');
}


export function getUserByUsername(username:string){
  return axios.get(`https://api.bilim-track.makalabox.com/api/users/${username}/`)
}