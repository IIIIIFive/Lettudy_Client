import { createRooms, getRooms, joinRoom } from '@/api/home.api';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const navigate = useNavigate();

  const { data: rooms = [], error } = useQuery(['rooms'], getRooms);

  const createRoomMutation = useMutation(createRooms, {
    onSuccess: (data) => {
      navigate(`/room/${data.roomId}`);
    },
  });

  const joinRoomMutation = useMutation(joinRoom, {
    onSuccess: (data) => {
      navigate(`/room/${data.roomId}`);
    },
  });

  const createRoom = (title: string) => {
    return createRoomMutation.mutateAsync(title);
  };

  const joinRoomWithCode = (roomCode: string) => {
    return joinRoomMutation.mutateAsync(roomCode);
  };

  return { createRoom, joinRoomWithCode, rooms, error };
};
