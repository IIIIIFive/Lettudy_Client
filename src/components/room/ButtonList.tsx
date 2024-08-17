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
        featName='기록하기'
        onClick={() => handleButtonClick('/room/create-note')}
      />
      <ButtonItem
        iconSrc='/assets/images/notebook.png'
        featName='노트 보기'
        onClick={() => handleButtonClick('/room/note')}
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
