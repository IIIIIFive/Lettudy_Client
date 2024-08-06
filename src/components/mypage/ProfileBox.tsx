import styled from 'styled-components';

interface ProfileBoxProps {
  name: string;
  email: string;
  studyCount: number;
  onClick: () => void;
}

function ProfileBox({ name, email, studyCount, onClick }: ProfileBoxProps) {
  return (
    <StyledProfileBox>
      <div className='avatar'>
        <img src='/assets/images/smile-cat.png' alt='smile-cat' width={156} />
      </div>
      <h1 className='name'>{name}</h1>
      <p className='email'>{email}</p>
      <p className='study-count'>현재 {studyCount}개의 스터디에 속해 있어요!</p>
      <div className='withdrawal' onClick={onClick}>
        <img src='/assets/icon/withdrawal.svg' alt='withdrawal' width={15} />
        <p>탈퇴하기</p>
      </div>
    </StyledProfileBox>
  );
}

export default ProfileBox;

const StyledProfileBox = styled.div`
  background: ${({ theme }) => theme.color_bgWhite};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 60px 20px;
  height: 100%;
  min-height: 500px;

  .avatar {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color_bgLightGray};
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name {
    text-align: center;
    margin-top: 56px;
  }

  .email {
    text-align: center;
    margin-top: 36px;
    font-size: ${({ theme }) => theme.fontSize_lg};
    color: ${({ theme }) => theme.color_textKey};
  }

  .study-count {
    text-align: center;
    margin-top: 36px;
    font-size: ${({ theme }) => theme.fontSize_xs};
    color: ${({ theme }) => theme.color_textGray};
  }

  .withdrawal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding: 10px;
    color: ${({ theme }) => theme.color_textKey};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize_xs};

    img {
      margin: 3px 8px 0 0;
    }
  }
`;
