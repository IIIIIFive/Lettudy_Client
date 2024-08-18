import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import styled from 'styled-components';
import NormalButton from '../common/NormalButton';
import { Schedules } from '@/model/room.model';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: Schedules) => void;
  selectedDate: Date | null;
  schedule: Schedules | null;
}
function CalendarModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  schedule,
}: CalendarModalProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('00:00');
  const [isAttendance, setIsAttendance] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (schedule) {
        setTitle(schedule.title);
        setTime(schedule.time);
        setIsAttendance(schedule.isAttendance);
      } else {
        setTitle('');
        setTime('00:00');
        setIsAttendance(false);
      }
    }
  }, [isOpen, schedule]);

  const handleSave = () => {
    if (title && time && selectedDate) {
      const newSchedule: Schedules = {
        scheduleId: schedule ? schedule.scheduleId : Date.now().toString(),
        title,
        date: selectedDate.toISOString().split('T')[0],
        time,
        isAttendance,
      };
      onSave(newSchedule);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CalendarModalStyle>
        <div className='title'>
          <img src='/assets/images/calendar.png' alt='calendar' width={35} />
          <h4>{schedule ? '일정 수정' : '일정 추가'}</h4>
        </div>
        <div className='label'>
          <div className='label-input'>
            <label>제목</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='label-input'>
            <label>시간</label>
            <input
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className='bottom-bar'>
          <div className='checkbox'>
            <input
              type='checkbox'
              checked={isAttendance}
              onChange={(e) => setIsAttendance(e.target.checked)}
            />
            <span>알람 ON</span>
          </div>
          <div className='button'>
            <NormalButton text='저장' size='small' onClick={handleSave} />
            {schedule && (
              <NormalButton text='삭제' size='small' onClick={() => {}} />
            )}
          </div>
        </div>
        <div className='notice'>
          알람 ON 선택시 출석부가 생성되며, 10분 전 웹 알람이 울립니다.
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
    margin-bottom: 15px;
  }
`;

export default CalendarModal;
