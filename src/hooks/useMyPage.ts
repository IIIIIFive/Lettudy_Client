import { useState } from 'react';
import { updateAlarm, leaveRoom } from '../api/myPage.api';
import { StudyRoom } from '@/model/user.model';

export const useMyPage = (initialRooms: StudyRoom[]) => {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>(initialRooms);

  const isNotificationEnabled = () => {
    return Notification.permission === 'granted';
  };

  const toggleAlarm = async (roomId: string) => {
    if (!isNotificationEnabled()) {
      alert(
        '알람을 사용하려면 권한을 허용해주세요.\n\n브라우저 설정 > 개인정보보안 탭에서 허용 가능합니다.',
      );
      return;
    }

    try {
      const currentAlarmStatus =
        studyRooms.find((room) => room.roomId === roomId)?.alarm ?? false;
      await updateAlarm(roomId, !currentAlarmStatus);

      const updatedRooms = studyRooms.map((room) =>
        room.roomId === roomId ? { ...room, alarm: !room.alarm } : room,
      );
      setStudyRooms(updatedRooms);
    } catch (err) {
      console.error('알람 변경 오류가 발생했습니다.', err);
    }
  };

  const handleLeaveRoom = async (roomId: string, roomTitle: string) => {
    const confirmed = confirm(`${roomTitle}에서 나가시겠습니까?`);
    if (!confirmed) return;

    try {
      await leaveRoom(roomId);

      const updatedRooms = studyRooms.filter((room) => room.roomId !== roomId);
      setStudyRooms(updatedRooms);
    } catch (err) {
      console.error('방 나가기 오류가 발생했습니다.');
    }
  };

  return {
    studyRooms,
    toggleAlarm,
    handleLeaveRoom,
    isNotificationEnabled,
  };
};
