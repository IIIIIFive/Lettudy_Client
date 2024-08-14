import styled from 'styled-components';
import AlarmButton from './AlarmButton';
import LeaveRoomButton from './LeaveRoomButton';
import EmptyList from './EmptyList';

interface StudyRoom {
  roomId: string;
  title: string;
  alarm: boolean;
  isOwner: boolean;
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
  const handleLeaveRoom = async (roomId: string) => {
    try {
      alert(`방 ${roomId}에서 나가기`);
    } catch (error) {
      console.error('Failed to leave room:', error);
      alert('방 나가기 실패');
    }
  };

  return (
    <StudyRoomListStyle>
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
                  <tr key={room.roomId}>
                    <td className='table-cell'>{room.title}</td>{' '}
                    <td className='table-cell'>
                      <AlarmButton
                        alarm={room.alarm}
                        onClick={() => toggleAlarm(room.roomId)}>
                        {' '}
                        {room.alarm ? '알람 OFF' : '알람 ON'}
                      </AlarmButton>
                    </td>
                    <td className='table-cell'>
                      <LeaveRoomButton
                        onClick={() => handleLeaveRoom(room.roomId)}
                      />{' '}
                      {/* 필드 이름 수정 */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </StudyRoomListStyle>
  );
}

export default StudyRoomList;

const StudyRoomListStyle = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  .title {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color_textKey};
    font-size: ${({ theme }) => theme.fontSize_reg};
    font-weight: bold;
    margin-bottom: 24px;
    img {
      margin: 0 10px;
    }
  }

  .study-box {
    background: ${({ theme }) => theme.color_bgWhite};
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    height: 100%;
    flex: 1;
  }

  .study-list {
    max-height: 400px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .study-table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;

    th,
    td {
      border-bottom: 1px solid #e7e7e7;
      box-sizing: border-box;
      color: ${({ theme }) => theme.color_textKey};
    }

    th {
      padding: 22px 30px 22px 0;
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSize_reg};
    }

    td {
      padding: 12px 30px 12px 0;
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
