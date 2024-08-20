import { useState } from 'react';
import { Schedules } from '@/model/room.model';
import { attendance, createSchedule, deleteSchedule } from '@/api/room.api';
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
  const addAttendance = async (attendanceId: string) => {
    try {
      const response = await attendance(roomId, attendanceId);
      queryClient.invalidateQueries({ queryKey: ['roomData', roomId] });
      return response;
    } catch (error) {
      console.error('출석하기 오류가 발생했습니다.');
      throw error;
    }
  };
  ``;

  return { schedules, addSchedule, removeSchedule, addAttendance };
};
