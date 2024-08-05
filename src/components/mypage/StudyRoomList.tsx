import styled from 'styled-components';
import AlarmButton from './AlarmButton';
import LeaveRoomButton from './LeaveRoomButton';
import EmptyList from './EmptyList';

interface StudyRoom {
  id: string;
  name: string;
  alarm: boolean;
}

interface StudyRoomListProps {
  studyRooms: StudyRoom[];
  toggleAlarm: (id: string) => void;
  userName: string;
}

function StudyRoomList({
  studyRooms,
  toggleAlarm,
  userName,
}: StudyRoomListProps) {
  const handleLeaveRoom = () => {
    alert('개발중입니다.');
  };

  return (
    <StyledStudyRoomList>
      <div className='title'>
        <img
          src='/assets/images/study-folder.png'
          alt='study-icon'
          width={47}
        />
        <h4>{userName}의 스터디 목록</h4>
      </div>
      <div className='study-box'>
        <table className='study-table'>
          <thead>
            <tr>
              <th className='table-header'>스터디 이름</th>
              <th className='table-header'>알람</th>
              <th className='table-header'>나가기</th>
            </tr>
          </thead>
        </table>
        <div className='study-list'>
          {studyRooms.length === 0 ? (
            <EmptyList userName={userName} />
          ) : (
            <table className='study-table'>
              <tbody>
                {studyRooms.map((room) => (
                  <tr key={room.id}>
                    <td className='table-cell'>{room.name}</td>
                    <td className='table-cell'>
                      <AlarmButton
                        alarm={room.alarm}
                        onClick={() => toggleAlarm(room.id)}>
                        {room.alarm ? '알람 OFF' : '알람 ON'}
                      </AlarmButton>
                    </td>
                    <td className='table-cell'>
                      <LeaveRoomButton onClick={() => handleLeaveRoom()} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </StyledStudyRoomList>
  );
}

export default StudyRoomList;

const StyledStudyRoomList = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color_textKey};
    font-size: ${({ theme }) => theme.fontSize_reg};
    font-weight: bold;
    margin-bottom: 28px;
    img {
      margin: 0 10px;
    }
  }

  .study-box {
    background: white;
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    height: 100%;
    min-height: 500px;
    flex: 1;
  }

  .study-list {
    max-height: 470px;
    overflow-y: auto;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .study-table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    table-layout: fixed;

    th,
    td {
      border-bottom: 1px solid #e7e7e7;
      box-sizing: border-box;
      font-size: ${({ theme }) => theme.fontSize_reg};
    }

    th {
      padding: 36px 0;
      font-weight: bold;
      color: ${({ theme }) => theme.color_textKey};
    }

    td {
      padding: 16px 0;
      color: ${({ theme }) => theme.color_textKey};
      font-size: ${({ theme }) => theme.fontSize_sm};
    }

    th:nth-child(1),
    td:nth-child(1) {
      width: 55%;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 25%;
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 25%;
    }
  }
`;
