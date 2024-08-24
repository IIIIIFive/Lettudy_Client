import { ChatRes } from '@/model/chat.model';
import { httpClient } from './http';

export const getChat = async (roomId: string) => {
  const response = await httpClient.get<ChatRes>(`/chats/${roomId}`);
  return response.data;
};
