import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import NormalButton from '../common/NormalButton';
import { useHome } from '@/hooks/useHome';

interface HomeModalsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'join';
  onConfirm: (inputValue: string) => void;
}

function HomeModals({ isOpen, onClose, type, onConfirm }: HomeModalsProps) {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleConfirm = () => {
    if (inputValue.length === 0) {
      setIsError(true);
      return;
    }

    setIsError(false);
    onConfirm(inputValue);
    setInputValue('');
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === 'create' && value.length <= 10) {
      setInputValue(value);
    } else if (type !== 'create') {
      setInputValue(value);
    }
    setIsError(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HomeModalsStyle isError={isError}>
        <div className='content'>
          <img src='/assets/images/speaker.png' alt='speaker' width={35} />
          <h2>{type === 'create' ? '스터디 만들기' : '스터디 입장'}</h2>
          {type === 'create'
            ? '스터디룸 제목을 입력해주세요!'
            : '스터디룸 입장 코드를 입력해주세요!'}
        </div>
        <div className='section'>
          <div className='input'>
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
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

const HomeModalsStyle = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 30px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.color_textGray};
    margin-bottom: 40px;
    text-align: center;
    gap: 20px;
  }

  .section {
    display: flex;

    .input {
      margin-bottom: 10px;
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
        color: ${({ isError, theme }) =>
          isError ? theme.color_textRed : theme.color_textGray};
      }
    }

    .button {
      margin-left: 30px;
    }
  }
`;

export default HomeModals;
