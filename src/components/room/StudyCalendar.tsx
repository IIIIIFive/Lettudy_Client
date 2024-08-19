import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCallback, useState } from 'react';
import CalendarModal from './CalendarModal';
import { useRoom } from '@/hooks/useRoom';
import { Schedules } from '@/model/room.model';
import moment from 'moment';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function StudyCalendar() {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedules | null>(
    null,
  );
  const { roomData } = useRoom();

  const onChangeCalendar = useCallback((value: Value) => {
    setCalendarValue(value);
  }, []);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
    const clickedDateString = moment(value).format('YYYY-MM-DD');
    const scheduleForDate = roomData?.schedules.find(
      (schedule) => schedule.date === clickedDateString,
    );
    setSelectedSchedule(scheduleForDate || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const renderTileContent = ({ date }: { date: Date }) => {
    const dateString = moment(date).format('YYYY-MM-DD');
    const schedule = roomData?.schedules.find((s) => s.date === dateString);
    if (schedule) {
      const truncatedTitle =
        schedule.title.length > 6
          ? `${schedule.title.slice(0, 7)}..`
          : schedule.title;
      return <div className='event'>{truncatedTitle}</div>;
    }
    return null;
  };

  return (
    <StudyCalendarStyle>
      <Calendar
        onChange={onChangeCalendar}
        value={calendarValue}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('DD')}
        tileContent={renderTileContent}
        onClickDay={handleDateClick}
      />
      <CalendarModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedDate={selectedDate}
        schedule={selectedSchedule}
        roomData={roomData!}
      />
    </StudyCalendarStyle>
  );
}

const StudyCalendarStyle = styled.div`
  .react-calendar {
    width: 100%;
    max-height: 540px;
    background: ${({ theme }) => theme.color_bgWhite};
    border: 0.5px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 5px;
    font-size: ${({ theme }) => theme.fontSize_reg};
  }

  .react-calendar__navigation {
    height: 70px;
    border-radius: 5px 5px 0 0;
    padding: 0 50px;
    margin: 0 20px;
    border-bottom: 1px solid ${({ theme }) => theme.color_borderGray};

    span {
      font-size: ${({ theme }) => theme.fontSize_sm};
      font-weight: 600;
      color: ${({ theme }) => theme.color_textBlack};
    }

    button {
      &:hover,
      &:focus {
        background: none;
      }
    }
  }

  .react-calendar__navigation__label {
    pointer-events: none;
  }

  .react-calendar__month-view {
    padding: 55px 30px;

    abbr {
      color: ${({ theme }) => theme.color_textBlack};
      font-size: ${({ theme }) => theme.fontSize_sm};
    }
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 20px;

    abbr {
      font-size: ${({ theme }) => theme.fontSize_sm};
      font-weight: 600;
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days__day--weekend abbr {
    color: ${({ theme }) => theme.color_textRed};
  }

  .react-calendar__month-view__days__day--neighboringMonth abbr {
    color: #cccccc;
  }

  .react-calendar__tile {
    text-align: center;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .event {
      background-color: #d3e5ef;
      color: ${({ theme }) => theme.color_textBlack};
      padding: 1px 6px;
      border-radius: 4px;
      margin-top: 4px;
      font-size: 11px;
      font-weight: 550;
      white-space: nowrap;
    }
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ theme }) => theme.color_bgLightGray};
    border-radius: 12px;
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.color_bgWhite};
    border-radius: 12px;
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.color_bgWhite};
    border-radius: 12px;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.color_bgLightGray};
    border-radius: 12px;
  }
`;

export default StudyCalendar;
