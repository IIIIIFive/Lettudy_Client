import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileBox from '../components/mypage/ProfileBox';
import StudyRoomList from '../components/mypage/StudyRoomList';
import BackButton from '@/components/common/BackButton';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { User } from '@/types/user';

function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getMyPage } = useAuth();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const fetchUserData = async () => {
      try {
        const userData = await getMyPage();
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('마이페이지 데이터를 가져오는 데 실패했습니다.');
      }
    };

    fetchUserData();
  }, [getMyPage, isLoggedIn]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <MyPageStyle>
      <BackButton text='마이페이지' />
      <div className='container'>
        <ProfileBox
          name={user.name}
          email={user.email}
          studyCount={user.rooms.length}
          onClick={() => alert('개발중입니다.')}
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

const MyPageStyle = styled.div`
  padding-top: 28px;
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

export default MyPage;
