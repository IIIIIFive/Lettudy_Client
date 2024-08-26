import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createSocket = (roomId: string) => {
  return io(BASE_URL, {
    path: '/socket.io',
    query: { roomId },
    transports: ['websocket'],
  });
};
