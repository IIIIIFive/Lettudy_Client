import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function BackButton({ text }: { text: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (text === '마이페이지') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <BackButtonStyle>
      <button className='back-button' onClick={handleBack}>
        <img
          className='back-icon'
          src='/assets/icon/back-icon.svg'
          alt='back'
          width={20}
        />{' '}
        <h4>{text}</h4>
      </button>
    </BackButtonStyle>
  );
}

const BackButtonStyle = styled.div`
  .back-button {
    display: flex;
    align-items: center;
    gap: 30px;
    background-color: ${({ theme }) => theme.color_bgLightGray};
  }
`;

export default BackButton;
