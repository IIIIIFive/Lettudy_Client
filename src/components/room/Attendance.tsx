import styled from 'styled-components';
import NormalButton from '../common/NormalButton';
import { useRoom } from '@/hooks/useRoom';
import { formatDateTime } from '@/utils/formatDateTime';
import { useSchedule } from '@/hooks/useSchedule';
import { useState } from 'react';

function Attendance() {
  const { roomData } = useRoom();
  const { addAttendance } = useSchedule(roomData?.roomId || '');
  const [isAttendanceCompleted, setIsAttendanceCompleted] = useState(false);

  const hasAttendanceSchedule =
    roomData?.nextAttendance.date && roomData?.nextAttendance.time;

  const formattedDateTime = formatDateTime(
    roomData?.nextAttendance.date || '',
    roomData?.nextAttendance.time || '',
  );

  // 출석 시간 계산
  const attendanceDateTime = new Date(
    `${roomData?.nextAttendance.date}T${roomData?.nextAttendance.time}`,
  );
  const now = new Date();
  const isAttendanceTime = now.getTime() >= attendanceDateTime.getTime();

  const handleAttendance = () => {
    if (roomData?.nextAttendance.attendanceId) {
      addAttendance(roomData.nextAttendance.attendanceId)
        .then(() => {
          setIsAttendanceCompleted(true);
        })
        .catch(() => {
          alert('다시 시도해주세요.');
        });
    }
  };

  return (
    <AttendanceStyle>
      <div className='title'>
        <h4>출석하기</h4>
        <img src='/assets/icon/info-icon.svg' alt='info' />
      </div>

      <div className='attendance-box'>
        <h5 className={!hasAttendanceSchedule ? 'no-schedule' : ''}>
          {formattedDateTime}
        </h5>
        <NormalButton
          text={isAttendanceCompleted ? '출석완료' : '출석하기'}
          size='large'
          disabled={
            !hasAttendanceSchedule || !isAttendanceTime || isAttendanceCompleted
          }
          onClick={handleAttendance}
        />
      </div>
    </AttendanceStyle>
  );
}

const AttendanceStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .title {
    display: flex;
    gap: 10px;
  }

  .attendance-box {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 70px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 0.3px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 12px;
    gap: 25px;
  }

  .no-schedule {
    color: ${({ theme }) => theme.color_textGray};
    font-size: ${({ theme }) => theme.fontSize_xs};
    font-weight: 400;
  }
`;

export default Attendance;
