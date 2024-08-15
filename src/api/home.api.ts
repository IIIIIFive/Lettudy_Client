import { httpClient } from './http';

export const createRooms = async (title: string) => {
  const response = await httpClient.post('/rooms', { title });
  return response.data;
};

export const getRooms = async () => {
  const response = await httpClient.get('/rooms');
  return response.data.rooms; // api 수정 전 임시
};

export const joinRoom = async (roomCode: string) => {
  const response = await httpClient.post(`/members/${roomCode}`);
  return response.data;
};
