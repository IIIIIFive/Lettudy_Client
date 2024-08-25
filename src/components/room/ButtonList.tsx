import styled from 'styled-components';
import ButtonItem from './ButtonItem';
import useModalStore from '@/store/modalStore';
import { useParams } from 'react-router-dom';

function ButtonList() {
  const { openModal } = useModalStore();
  const { roomId } = useParams<{ roomId: string }>();

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
        onClick={() => handleButtonClick(`/room/${roomId}/create-note`)}
      />
      <ButtonItem
        iconSrc='/assets/images/notebook.png'
        featName='노트 보기'
        onClick={() => handleButtonClick(`/room/${roomId}/notes`)}
      />
      <ButtonItem
        iconSrc='/assets/images/box.png'
        featName='자료 모음'
        onClick={() => handleButtonClick(`/room/${roomId}/links`)}
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
