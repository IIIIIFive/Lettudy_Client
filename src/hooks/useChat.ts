import { getChat } from '@/api/chat.api';
import { useQuery } from '@tanstack/react-query';

export const useChat = (roomId: string) => {
  return useQuery({
    queryKey: ['chat', roomId],
    queryFn: () => getChat(roomId),
  });
};
