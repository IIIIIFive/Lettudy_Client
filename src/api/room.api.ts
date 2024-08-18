import { RoomDataRes } from '@/model/room.model';
import { httpClient } from './http';

export const getRoomData = async (roomId: string) => {
  const response = await httpClient.get<RoomDataRes>(`/rooms/${roomId}`);
  return response.data;
};
