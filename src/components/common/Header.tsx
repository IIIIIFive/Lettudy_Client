import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <img
        src='/assets/images/logo-withLettudy.png'
        alt='logo'
        height={70}
        onClick={() => navigate('/')}
      />
      <div className='icons'>
        <div className='icon'>
          <img
            src='/assets/images/mypage-face.png'
            alt='mypage'
            width={50}
            onClick={() => navigate('/mypage')}
          />
          <span>마이페이지</span>
        </div>
        <div className='icon'>
          <img src='/assets/images/logout-face.png' alt='logout' width={50} />
          <span>로그아웃</span>
        </div>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;

  .icons {
    display: flex;
    gap: 35px;
    margin-top: 10px;

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      span {
        font-size: ${({ theme }) => theme.fontSize_xs};
      }
    }
  }
`;

export default Header;
