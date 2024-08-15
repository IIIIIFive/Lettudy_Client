import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';

interface ProfileBoxProps {
  name: string;
  email: string;
  studyCount: number;
  onClick: () => void;
}

function ProfileBox({ name, email, studyCount, onClick }: ProfileBoxProps) {
  const { userQuit } = useAuth();

  const handleClick = async () => {
    if (confirm('정말로 회원 탈퇴하시겠습니까?')) {
      try {
        await userQuit();
      } catch (err) {
        console.error('Failed to quit:', err);
        alert('회원 탈퇴 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <ProfileBoxStyle>
      <div className='avatar'>
        <img src='/assets/images/smile-cat.png' alt='smile-cat' width={156} />
      </div>
      <h1 className='name'>{name}</h1>
      <p className='email'>{email}</p>
      <p className='study-count'>
        현재 <span>{studyCount}</span>개의 스터디에 속해 있어요!
      </p>
      <div className='withdrawal' onClick={handleClick}>
        <img src='/assets/icon/withdrawal.svg' alt='withdrawal' width={15} />
        <p>탈퇴하기</p>
      </div>
    </ProfileBoxStyle>
  );
}

export default ProfileBox;

const ProfileBoxStyle = styled.div`
  background: ${({ theme }) => theme.color_bgWhite};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 10vh 32px;
  height: 100%;

  .avatar {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color_bgLightGray};
    margin: 0 auto;
    padding-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name,
  .email,
  .study-count {
    text-align: center;
    margin-top: 24px;
  }

  .name {
    font-size: ${({ theme }) => theme.fontSize_lg};
    margin-top: 36px;
  }

  .email {
    font-size: ${({ theme }) => theme.fontSize_md};
    color: ${({ theme }) => theme.color_textKey};
    margin-bottom: 40px;
  }

  .study-count {
    font-size: ${({ theme }) => theme.fontSize_xs};
    color: ${({ theme }) => theme.color_textGray};

    span {
      color: ${({ theme }) => theme.color_textKey};
      font-weight: 700;
    }
  }

  .withdrawal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    padding: 10px;
    color: ${({ theme }) => theme.color_textKey};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize_xs};

    img {
      margin-right: 8px;
    }
  }
`;
