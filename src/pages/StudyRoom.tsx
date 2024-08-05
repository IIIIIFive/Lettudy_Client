import AttendanceList from '@/components/room/AttendanceList';
import StudyCalendar from '@/components/room/StudyCalendar';
import TopSection from '@/components/room/TopSection';
import styled from 'styled-components';

function StudyRoom() {
  return (
    <StudyRoomStyle>
      <div className='content'>
        <TopSection />
        <StudyCalendar />
      </div>
      <AttendanceList />
    </StudyRoomStyle>
  );
}

export default StudyRoom;

const StudyRoomStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 75px;
  padding: 40px 0 100px;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
