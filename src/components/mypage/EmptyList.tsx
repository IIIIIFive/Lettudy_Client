import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface EmptyListProps {
  userName: string;
}

function EmptyList({ userName }: EmptyListProps) {
  return (
    <EmptyListStyle>
      <div className='no-study'>
        <p>{`${userName}님이 속한 스터디가 아직 없어요`}</p>
        <img
          src='/assets/images/droplet.png'
          alt='droplet'
          width={10}
          height={14}
        />
      </div>
      <p className='instruction'>
        직접 스터디를 만들고 팀원들과 함께 해보세요!
      </p>
      <div className='main-link'>
        <Link to='/'>메인 화면으로 이동</Link>
      </div>
    </EmptyListStyle>
  );
}

export default EmptyList;

const EmptyListStyle = styled.div`
  padding: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  max-height: 400px;

  .no-study {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    p {
      font-size: ${({ theme }) => theme.fontSize_xs};
      color: ${({ theme }) => theme.color_textKey};
      margin-right: 8px;
    }
  }

  .instruction {
    font-size: ${({ theme }) => theme.fontSize_xs};
    color: ${({ theme }) => theme.color_textKey};
    margin-bottom: 12px;
  }

  .main-link {
    margin-top: 120px;
    font-size: ${({ theme }) => theme.fontSize_xs};
    color: ${({ theme }) => theme.color_textKey};

    a {
      color: ${({ theme }) => theme.color_textKey};
    }
  }
`;
