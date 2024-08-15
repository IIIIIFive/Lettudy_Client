import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCallback, useState } from 'react';
import CalendarModal from './CalendarModal';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Event {
  date: Date;
  title: string;
  time: string;
  alarm: boolean;
}

function StudyCalendar() {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const onChangeCalendar = useCallback((value: Value) => {
    setCalendarValue(value);
  }, []);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveEvent = (title: string, time: string, alarm: boolean) => {
    if (selectedDate && title && time) {
      setEvents([...events, { date: selectedDate, title, time, alarm }]);
      handleModalClose();
    }
  };

  const renderTileContent = ({ date }: { date: Date }) => {
    const event = events.find(
      (event) => event.date.toDateString() === date.toDateString(),
    );
    return event ? <div className='event'>{event.title}</div> : null;
  };

  return (
    <StudyCalendarStyle>
      <Calendar
        onChange={onChangeCalendar}
        value={calendarValue}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        tileContent={renderTileContent}
        onClickDay={handleDateClick}
      />
      <CalendarModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
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

  // 상단 내비게이션(년, 월)
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

  // 월 달력 (내비게이션 제외)
  .react-calendar__month-view {
    padding: 55px 30px;
    abbr {
      // 텍스트
      color: ${({ theme }) => theme.color_textBlack};
      font-size: ${({ theme }) => theme.fontSize_sm};
    }
  }

  // 요일
  .react-calendar__month-view__weekdays {
    margin-bottom: 20px;

    abbr {
      // 텍스트
      font-size: ${({ theme }) => theme.fontSize_sm};
      font-weight: 600;
      text-decoration: none;
    }
  }

  // 주말
  .react-calendar__month-view__days__day--weekend abbr {
    color: ${({ theme }) => theme.color_textRed};
  }

  // 해당 월이 아닌 날짜
  .react-calendar__month-view__days__day--neighboringMonth abbr {
    color: #cccccc;
  }

  // 일
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
      font-size: ${({ theme }) => theme.fontSize_xxs};
      font-weight: 700;
      white-space: nowrap;
    }
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ theme }) => theme.color_bgLightGray};
    border-radius: 12px;
  }

  // 클릭된 날짜
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.color_bgWhite};
    border-radius: 12px;
  }

  // 오늘
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
