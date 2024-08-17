import { RoomsRes } from '@/model/room.model';
import { httpClient } from './http';

export const createRooms = async (title: string) => {
  const response = await httpClient.post('/rooms', { title });
  return response.data;
};

export const getRooms = async () => {
  const response = await httpClient.get<RoomsRes>('/rooms');
  return response.data;
};

export const joinRoom = async (roomCode: string) => {
  const response = await httpClient.post(`/members/${roomCode}`);
  return response.data;
};
