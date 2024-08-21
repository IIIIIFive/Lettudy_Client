import styled from 'styled-components';
import ProfileBox from '../components/mypage/ProfileBox';
import StudyRoomList from '../components/mypage/StudyRoomList';
import BackButton from '@/components/common/BackButton';
import { useUserData } from '../hooks/useUserData';

function MyPage() {
  const { user, setUser } = useUserData();

  if (!user) {
    return;
  }

  return (
    <MyPageStyle>
      <BackButton text='마이페이지' />
      <div className='container'>
        <ProfileBox
          name={user.name}
          email={user.email}
          studyCount={user.rooms.length}
        />
        <StudyRoomList
          userName={user.name}
          studyRooms={user.rooms}
          toggleAlarm={(id) => {
            setUser((prevUser) => {
              if (!prevUser) return null;
              return {
                ...prevUser,
                rooms: prevUser.rooms.map((room) =>
                  room.roomId === id ? { ...room, alarm: !room.alarm } : room,
                ),
              };
            });
          }}
        />
      </div>
    </MyPageStyle>
  );
}

export default MyPage;

const MyPageStyle = styled.div`
  padding-top: 28px;
  max-height: 100vh;

  .container {
    gap: 40px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 40px 0;
    position: relative;
  }

  @media (max-width: 855px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
`;
