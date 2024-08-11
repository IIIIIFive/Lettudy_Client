import BackButton from '@/components/common/BackButton';
import Attendance from '@/components/room/Attendance';
import AttendanceList from '@/components/room/AttendanceList';
import MyAttendance from '@/components/room/MyAttendance';
import StudyCalendar from '@/components/room/StudyCalendar';
import TopSection from '@/components/room/TopSection';
import styled from 'styled-components';

function StudyRoom() {
  return (
    <>
      <BackButton text='스터디룸' />
      <StudyRoomStyle>
        <div className='contents'>
          <TopSection />
          <div className='middle-contents'>
            <StudyCalendar />
            <div className='attendance'>
              <Attendance />
              <MyAttendance />
            </div>
          </div>
        </div>
        <AttendanceList />
      </StudyRoomStyle>
    </>
  );
}

export default StudyRoom;

const StudyRoomStyle = styled.div`
  width: 100%;
  display: flex;

  gap: 35px;
  padding: 20px 0 100px;

  .contents {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;

    .middle-contents {
      display: flex;

      gap: 50px;

      .attendance {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
    }
  }
`;
