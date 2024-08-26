import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ButtonList from './ButtonList';
import { useRoom } from '@/hooks/useRoom';
import Notice from './Notice';

function TopSection() {
  const { roomData, updateNotice } = useRoom();
  const [isEditing, setIsEditing] = useState(false);
  const [notices, setNotices] = useState<string[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const codeRef = useRef<HTMLParagraphElement>(null);

  const handleEditClick = () => {
    const filteredNotices = notices.filter((n) => n.trim() !== '');
    if (isEditing) updateNotice(filteredNotices);
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (roomData?.notice) setNotices(roomData.notice);
  }, [roomData?.notice]);

  const copyCodeToClipboard = () => {
    if (roomData?.code) {
      navigator.clipboard.writeText(roomData.code).then(() => {
        showCodeTemporarily();
      });
    }
  };

  const showCodeTemporarily = () => {
    setShowCode(true);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
      setTimeout(() => setShowCode(false), 200);
    }, 2000);
  };

  return (
    <TopSectionStyle>
      <div className='title'>
        <img
          src='/assets/images/placard.png'
          alt='placard'
          width={50}
          height={50}
        />
        <h2>{roomData?.title}</h2>
        <span onClick={copyCodeToClipboard}>
          입장 코드
          <p ref={codeRef}>{showCode ? roomData?.code : '• • • • • •'}</p>
        </span>
      </div>

      <div className='content'>
        <div className='notice-box'>
          {(notices.length === 0 && !isEditing
            ? ['공지 사항 또는 스터디 내의 규칙을 입력해주세요!']
            : notices
          ).map((notice, index) => (
            <Notice
              key={index}
              notice={notice}
              index={index}
              isEditing={isEditing}
              notices={notices}
              setNotices={setNotices}
            />
          ))}
        </div>

        <img
          className='edit-icon'
          src={
            isEditing
              ? '/assets/icon/edit-check-icon.svg'
              : '/assets/icon/edit-icon.svg'
          }
          alt={isEditing ? 'check' : 'edit'}
          width={30}
          onClick={handleEditClick}
        />
      </div>

      {isToastVisible && <div className='toast'>복사되었습니다!</div>}

      <ButtonList />
    </TopSectionStyle>
  );
}

const TopSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    display: flex;
    align-items: center;
    margin: 5px 5px 10px 5px;

    h2 {
      margin-left: 5px;
      color: ${({ theme }) => theme.color_textBlack};
    }

    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: auto;
      padding: 6px 10px;
      font-size: ${({ theme }) => theme.fontSize_sm};
      color: ${({ theme }) => theme.color_textKey};
      border: 1px solid ${({ theme }) => theme.color_borderGray};
      border-radius: 5px;
      cursor: pointer;

      p {
        margin-top: 7px;
        font-weight: 600;
        transition: opacity 0.3s;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 25px 40px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 0.3px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 12px;
    position: relative;

    .notice-box {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .edit-icon {
      position: absolute;
      top: 22px;
      right: 40px;
      cursor: pointer;
    }
  }

  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.color_bgWhite};
    color: ${({ theme }) => theme.color_textBlack};
    padding: 10px 20px;
    border: 1px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    font-size: ${({ theme }) => theme.fontSize_sm};
    text-align: center;
  }
`;

export default TopSection;
