import styled from 'styled-components';
import ProfileBox from '../components/mypage/ProfileBox';
import StudyRoomList from '../components/mypage/StudyRoomList';
import BackButton from '@/components/common/BackButton';
import { useUserData } from '../hooks/useUserData';
import { useEffect, useState } from 'react';
import { StudyRoom } from '@/model/user.model';

function MyPage() {
  const { user, setUser } = useUserData();
  const [studyCount, setStudyCount] = useState(user?.rooms.length || 0);

  useEffect(() => {
    if (user && user.rooms) {
      setStudyCount(user.rooms.length);
    }
  }, [user]);

  if (!user) {
    return;
  }

  const handleRoomsUpdate = (updatedRooms: StudyRoom[]) => {
    setStudyCount(updatedRooms.length);
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, rooms: updatedRooms };
    });
  };

  return (
    <MyPageStyle>
      <BackButton text='마이페이지' />
      <div className='container'>
        <ProfileBox
          name={user.name}
          email={user.email}
          studyCount={studyCount}
        />
        <StudyRoomList
          userName={user.name}
          studyRooms={user.rooms}
          onRoomsUpdate={handleRoomsUpdate}
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
