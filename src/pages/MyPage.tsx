import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileBox from '../components/mypage/ProfileBox';
import StudyRoomList from '../components/mypage/StudyRoomList';
import { useNavigate } from 'react-router-dom';

interface StudyRoom {
  id: string;
  name: string;
  alarm: boolean;
}

interface User {
  name: string;
  email: string;
  studyRooms: StudyRoom[];
}

const user: User = {
  name: '김터디',
  email: 'email123@naver.com',
  studyRooms: [],
};

function MyPage() {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>(user.studyRooms);
  const navigate = useNavigate();

  const handleClick = () => {
    alert('개발중입니다.');
  };

  const goBack = () => {
    navigate(-1);
  };

  const toggleAlarm = (id: string) => {
    setStudyRooms((prevStudyRooms) =>
      prevStudyRooms.map((room) =>
        room.id === id ? { ...room, alarm: !room.alarm } : room,
      ),
    );
  };

  return (
    <MyPageStyle>
      <div className='container'>
        <img
          className='back-icon'
          src='/assets/icon/back-icon.svg'
          alt='back'
          width={30}
          onClick={goBack}
        />
        <ProfileBox
          name={user.name}
          email={user.email}
          studyCount={studyRooms.length}
          onClick={handleClick}
        />
        <StudyRoomList
          userName={user.name}
          studyRooms={studyRooms}
          toggleAlarm={toggleAlarm}
        />
      </div>
    </MyPageStyle>
  );
}

const MyPageStyle = styled.div`
  padding: 32px;
  .container {
    gap: 40px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 30px 48px;
    position: relative;
  }
  .back-icon {
    cursor: pointer;
    position: absolute;
    left: 50px;
    top: -24px;
  }
`;

export default MyPage;
