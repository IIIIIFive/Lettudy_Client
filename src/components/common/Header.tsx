import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ChatRoom from '../chat/ChatRoom';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);

  const handleImageClick = () => {
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  const handleLogout = () => {
    const confirmed = confirm('정말 로그아웃 하시겠습니까?');
    if (confirmed) {
      userLogout();
    }
  };
  const isRoomPage = location.pathname.startsWith('/room');

  return (
    <HeaderStyle>
      <img
        src='/assets/images/logo-withLettudy.png'
        alt='logo'
        height={50}
        onClick={() => navigate('/')}
      />
      <div className='icons'>
        {isLoggedIn && isRoomPage && (
          <div className='icon'>
            <img
              src='/assets/images/chat.png'
              alt='chat'
              width={40}
              onClick={handleImageClick}
            />
            <span>채팅</span>
            <ChatRoom visible={chatVisible} onClose={handleCloseChat} />
          </div>
        )}
        <div className='icon'>
          <img
            src='/assets/images/mypage-face.png'
            alt='mypage'
            width={40}
            onClick={() => navigate('/mypage')}
          />
          <span>마이페이지</span>
        </div>
        <div className='icon'>
          <img
            src='/assets/images/logout-face.png'
            alt='logout'
            width={40}
            onClick={handleLogout}
          />
          <span>로그아웃</span>
        </div>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  .icons {
    display: flex;
    gap: 35px;
    margin-top: 25px;

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      span {
        font-size: ${({ theme }) => theme.fontSize_xs};
      }
    }
  }
`;

export default Header;
