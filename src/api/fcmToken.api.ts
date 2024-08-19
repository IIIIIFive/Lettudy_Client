import { httpClient } from './http';

export const registerFcmToken = async (token: string) => {
  const response = await httpClient.post('/users/fcmToken', {
    fcmToken: token,
  });
  return response.data;
};

export const deleteFcmToken = async () => {
  const response = await httpClient.delete('/users/fcmToken');
  return response.data;
};
