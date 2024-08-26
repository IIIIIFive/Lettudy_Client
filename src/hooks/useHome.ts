import { createRooms, getRooms, joinRoom } from '@/api/home.api';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
    enabled: isLoggedIn,
  });

  const rooms = data?.rooms || [];

  const createRoomMutation = useMutation({
    mutationFn: createRooms,
    onSuccess: (data) => {
      navigate(`/room/${data.roomId}`);
    },
  });

  const joinRoomMutation = useMutation({
    mutationFn: joinRoom,
    onSuccess: (data) => {
      navigate(`/room/${data.roomId}`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message;
      alert(errorMessage);
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
