import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ButtonList from './ButtonList';
import { useRoom } from '@/hooks/useRoom';
import Notice from './Notice';

function TopSection() {
  const { roomData } = useRoom();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [notices, setNotices] = useState<string[]>(roomData?.notice || []);
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    if (roomData?.notice) {
      setNotices(roomData.notice);
    }
  }, [roomData?.notice]);

  const handleEditClick = (): void => {
    setIsEditing(!isEditing);
  };

  const toggleCodeVisibility = () => {
    setShowCode(!showCode);
  };

  return (
    <TopSectionStyle>
      <div className='title'>
        <h2>{roomData?.title}</h2>
        <img
          src='/assets/images/placard.png'
          alt='placard'
          width={50}
          height={50}
        />
        <span onClick={toggleCodeVisibility}>
          입장 코드 {showCode ? roomData?.code : '• • • • • •'}
        </span>
      </div>

      <div className='content'>
        <div className='notice-box'>
          {(notices.length === 0
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
      color: ${({ theme }) => theme.color_textBlack};
    }

    span {
      margin-left: auto;
      padding: 6px 10px;
      font-size: ${({ theme }) => theme.fontSize_sm};
      color: ${({ theme }) => theme.color_textKey};
      border: 1px solid ${({ theme }) => theme.color_borderGray};
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
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
`;

export default TopSection;
