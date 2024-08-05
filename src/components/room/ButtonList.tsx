import styled from 'styled-components';
import ButtonItem from './ButtonItem';
import { useState } from 'react';

function ButtonList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (path: string) => {
    if (path === 'modal') {
      setIsModalOpen(true);
    } else {
      window.location.href = path;
    }
  };

  return (
    <ButtonListStyle>
      <ButtonItem
        iconSrc='/assets/images/pencil.png'
        iconBgColor='#D2E6F4'
        featName='회의록 작성'
        onClick={() => handleButtonClick('/create-note')}
      />
      <ButtonItem
        iconSrc='/assets/images/notepad.png'
        iconBgColor='#F5E0A0'
        featName='회의록 보기'
        onClick={() => handleButtonClick('/note')}
      />
      <ButtonItem
        iconSrc='/assets/images/clip.png'
        iconBgColor='#E4E1F5'
        featName='자료 모음'
        onClick={() => handleButtonClick('/links')}
      />
      <ButtonItem
        iconSrc='/assets/images/dice.png'
        iconBgColor='#F5DADC'
        featName='팀원 뽑기'
        onClick={() => handleButtonClick('modal')}
      />
    </ButtonListStyle>
  );
}

const ButtonListStyle = styled.div`
  display: flex;
  gap: 30px;
`;

export default ButtonList;
