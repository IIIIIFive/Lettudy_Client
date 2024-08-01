import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import NormalButton from '../common/NormalButton';

interface HomeModalsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'join';
  onConfirm: (inputValue: string) => void;
}

function HomeModals({ isOpen, onClose, type, onConfirm }: HomeModalsProps) {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    onConfirm(inputValue);
    setInputValue('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HomeModalsStyle>
        <div className='title'>
          <img src='/assets/images/speaker.png' alt='speaker' width={35} />
          {type === 'create'
            ? '스터디방 제목을 입력해주세요!'
            : '스터디방 입장 코드를 입력해주세요!'}
        </div>
        <div className='section'>
          <div className='input'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                type === 'create'
                  ? '10자 이내로 입력해주세요'
                  : '입장 코드를 입력해주세요'
              }
            />
          </div>
          <div className='button'>
            <NormalButton text='확인' onClick={handleConfirm} />
          </div>
        </div>
      </HomeModalsStyle>
    </Modal>
  );
}

const HomeModalsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 40px;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.color_textBlack};
    font-size: ${({ theme }) => theme.fontSize_md};
    margin-bottom: 16px;
    text-align: center;
    gap: 20px;
  }

  .section {
    display: flex;

    .input {
      margin-bottom: 20px;
      width: 100%;
      flex: 1;

      input {
        width: 100%;
        padding: 10px;
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.color_borderGray};
        font-size: ${({ theme }) => theme.fontSize_sm};
        outline: none;
        box-shadow: none;
      }
      input::placeholder {
        font-size: ${({ theme }) => theme.fontSize_xs};
        color: ${({ theme }) => theme.color_textGray};
      }
    }

    .button {
      margin-left: 30px;
    }
  }
`;

export default HomeModals;
