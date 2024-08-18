import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoomData } from '@/api/room.api';
import { RoomDataRes } from '@/model/room.model';

export const useRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const { data } = useQuery<RoomDataRes>({
    queryKey: ['roomData', roomId],
    queryFn: () => {
      if (!roomId) {
        return Promise.reject('RoomId가 유효하지 않습니다.');
      }
      return getRoomData(roomId);
    },
    enabled: !!roomId,
    initialData: {
      message: '',
      roomId: '',
      title: '',
      code: '',
      notice: '',
      members: [],
      nextAttendance: { date: '', time: '' },
      attendanceRecord: [],
      schedules: [],
    },
  });
  const roomData = data
    ? {
        ...data,
        nextAttendance:
          data.nextAttendance.date && data.nextAttendance.time
            ? data.nextAttendance
            : { date: '', time: '' },
      }
    : undefined;
  return { roomData };
};
