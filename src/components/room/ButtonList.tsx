import styled from 'styled-components';
import ButtonItem from './ButtonItem';
import useModalStore from '@/store/modalStore';

function ButtonList() {
  const { openModal } = useModalStore();

  const handleButtonClick = (path: string) => {
    if (path === 'modal') {
      openModal('drawing');
    } else {
      window.location.href = path;
    }
  };

  return (
    <ButtonListStyle>
      <ButtonItem
        iconSrc='/assets/images/pencil.png'
        featName='회의록 작성'
        onClick={() => handleButtonClick('/create-note')}
      />
      <ButtonItem
        iconSrc='/assets/images/notebook.png'
        featName='회의록 보기'
        onClick={() => handleButtonClick('/note')}
      />
      <ButtonItem
        iconSrc='/assets/images/box.png'
        featName='자료 모음'
        onClick={() => handleButtonClick('/room/links')}
      />
      <ButtonItem
        iconSrc='/assets/images/category.png'
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