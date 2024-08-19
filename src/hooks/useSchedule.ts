import { useState } from 'react';
import { Schedules } from '@/model/room.model';
import { createSchedule, deleteSchedule } from '@/api/room.api';
import { useQueryClient } from '@tanstack/react-query';

export const useSchedule = (roomId: string) => {
  const [schedules, setSchedules] = useState<Schedules[]>([]);
  const queryClient = useQueryClient();

  const addSchedule = async (newSchedule: Omit<Schedules, 'scheduleId'>) => {
    try {
      const response = await createSchedule({ roomId, ...newSchedule });
      setSchedules((prevSchedules) => [...prevSchedules, response]);

      queryClient.invalidateQueries({ queryKey: ['roomData', roomId] });
    } catch (error) {
      console.error('일정 생성 오류가 발생했습니다.');
    }
  };

  const removeSchedule = async (scheduleId: string) => {
    try {
      await deleteSchedule(roomId, scheduleId);
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.scheduleId !== scheduleId),
      );

      queryClient.invalidateQueries({ queryKey: ['roomData', roomId] });
    } catch (error) {
      console.error('일정 삭제 오류가 발생했습니다.');
    }
  };

  return { schedules, addSchedule, removeSchedule };
};
