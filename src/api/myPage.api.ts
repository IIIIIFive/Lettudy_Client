import { httpClient } from './http';

export const updateAlarm = async (roomId: string, alarmStatus: boolean) => {
  const response = await httpClient.put(`/members/${roomId}/alarm`, {
    alarm: alarmStatus,
  });
  return response.data;
};

export const leaveRoom = async (roomId: string) => {
  const response = await httpClient.delete(`/members/${roomId}`);
  return response.data;
};
