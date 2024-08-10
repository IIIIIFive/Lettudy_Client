import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import NormalButton from '../common/NormalButton';

interface DrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function DrawingModal({ isOpen, onClose }: DrawingModalProps) {
  const names = ['강정윤', '박은지', '송호진', '연하영']; // 더미데이터

  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelectedName(names[count % names.length]);
      count++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setSelectedName(names[Math.floor(Math.random() * names.length)]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DrawingModalStyle>
        <img src='/assets/images/dice.png' alt='dice' width={35} />
        <h2>팀원 뽑기</h2>
        <span>오늘의 발표자 또는 서기를 대신 뽑아드릴게요!</span>

        <div className='slot-machine'>
          <div className={`name-display ${isSpinning ? 'spinning' : ''}`}>
            <h4>{selectedName || '???'}</h4>
          </div>
        </div>

        <div className='button'>
          <NormalButton
            text='뽑기'
            onClick={handleSpin}
            disabled={isSpinning}
          />
        </div>
      </DrawingModalStyle>
    </Modal>
  );
}

const DrawingModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  img {
    margin-bottom: 10px;
  }
  span {
    color: ${({ theme }) => theme.color_textGray};
  }

  .slot-machine {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name-display {
    margin: 10px 0 0 0;
    padding: 10px;
    border: 2px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 5px;
    width: 60%;
    text-align: center;
    transition: all 0.1s ease-in-out;

    &.spinning {
      animation: spin 0.1s linear infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .button {
    margin-top: 20px;
  }
`;

export default DrawingModal;
