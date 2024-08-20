import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileBox from '../components/mypage/ProfileBox';
import StudyRoomList from '../components/mypage/StudyRoomList';
import BackButton from '@/components/common/BackButton';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { User } from '@/model/user.model';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getMyPage } = useAuth();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/login');
    }
    const fetchUserData = async () => {
      const userData = await getMyPage();
      if (userData) {
        setUser(userData);
      } else {
        setError('유저 데이터를 불러오는데 실패했습니다.');
        return navigate('/login');
      }
    };

    fetchUserData();
  }, [getMyPage, isLoggedIn]);

  if (error) {
    return <div>{error}</div>;
  }

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
