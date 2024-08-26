import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import styled from 'styled-components';
import NormalButton from '../common/NormalButton';
import { RoomDataRes, Schedules } from '@/model/room.model';
import { useSchedule } from '@/hooks/useSchedule';
import moment from 'moment';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  schedule: Schedules | null;
  roomData: RoomDataRes;
}

function CalendarModal({
  isOpen,
  onClose,
  selectedDate,
  schedule,
  roomData,
}: CalendarModalProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('00:00');
  const [isAttendance, setIsAttendance] = useState(false);
  const { addSchedule, removeSchedule } = useSchedule(roomData.roomId);

  useEffect(() => {
    if (isOpen) {
      if (schedule) {
        setTitle(schedule.title);
        setTime(schedule.time.substring(0, 5));
        setIsAttendance(schedule.isAttendance);
      } else {
        setTitle('');
        setTime('00:00');
        setIsAttendance(false);
      }
    }
  }, [isOpen, schedule]);

  const handleSave = async () => {
    if (title && time && selectedDate) {
      const newSchedule: Omit<Schedules, 'scheduleId'> = {
        title,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        time,
        isAttendance,
      };

      await addSchedule(newSchedule);
      onClose();
    }
  };

  const handleDelete = async () => {
    if (schedule && schedule.scheduleId) {
      await removeSchedule(schedule.scheduleId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CalendarModalStyle>
        <div className='title'>
          <img src='/assets/images/calendar.png' alt='calendar' width={35} />
          <h4>{schedule ? '일정 삭제' : '일정 추가'}</h4>
        </div>
        <div className='label'>
          <div className='label-input'>
            <label>제목</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!!schedule}
            />
          </div>
          <div className='label-input'>
            <label>시간</label>
            <input
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={!!schedule}
            />
          </div>
        </div>
        <div className='bottom-bar'>
          <div className='checkbox'>
            <input
              type='checkbox'
              checked={isAttendance}
              onChange={(e) => setIsAttendance(e.target.checked)}
              disabled={!!schedule}
            />
            <span>출석 생성</span>
          </div>
          <div className='button'>
            {schedule ? (
              <div className='button'>
                <NormalButton text='삭제' size='small' onClick={handleDelete} />
              </div>
            ) : (
              <div className='button'>
                <NormalButton text='저장' size='small' onClick={handleSave} />
              </div>
            )}
          </div>
        </div>
        <div className='notice'>
          출석 생성 선택 시 출석부가 생성되며, 10분 전 웹 알람이 울립니다.
        </div>
      </CalendarModalStyle>
    </Modal>
  );
}

const CalendarModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .label {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 30px 0;

    .label-input {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;

      label {
        flex: 1;
        font-size: ${({ theme }) => theme.fontSize_sm};
      }

      input {
        width: 80%;
        outline: none;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color_borderGray};
      }
    }
  }

  .bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    .button {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 5px;

      input {
        width: 16px;
        height: 16px;
      }

      span {
        font-size: ${({ theme }) => theme.fontSize_sm};
      }
    }
  }

  .notice {
    font-size: ${({ theme }) => theme.fontSize_xxs};
    color: ${({ theme }) => theme.color_textGray};
    text-align: left;
    margin: 10px 0 15px 0;
  }
`;

export default CalendarModal;
