import { JoinProps } from '../pages/Join';
import { LoginProps } from '../pages/Login';
import { httpClient } from './http';

interface LoginResponse {
  token: string;
}

interface User {
  name: string;
  email: string;
  rooms: {
    roomId: string;
    title: string;
    alarm: boolean;
    isOwner: boolean;
  }[];
}

export const join = async (data: JoinProps) => {
  const response = await httpClient.post('/users/join', data);
  return response.data;
};

export const login = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>('/users/login', data);
  return response.data;
};

export const checkEmail = async (email: string) => {
  const response = await httpClient.post('/users/check-email', { email });
  return response.data;
};

export const getMyPage = async (): Promise<User> => {
  const response = await httpClient.get('/users/mypage');
  return response.data;
};

export const deleteUser = async () => {
  await httpClient.delete('/users/quit');
};
