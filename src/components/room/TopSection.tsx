import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ButtonList from './ButtonList';
import { useRoom } from '@/hooks/useRoom';
import Notice from './Notice';

function TopSection() {
  const { roomData, updateNotice } = useRoom();
  const [isEditing, setIsEditing] = useState(false);
  const [notices, setNotices] = useState<string[]>([]);
  const [showCode, setShowCode] = useState(false);

  const handleEditClick = () => {
    const filteredNotices = notices.filter((n) => n.trim() !== '');
    if (isEditing) updateNotice(filteredNotices);
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (roomData?.notice) setNotices(roomData.notice);
  }, [roomData?.notice]);

  const toggleCodeVisibility = () => setShowCode(!showCode);
  const allNoticesEmpty = notices.every((n) => n.trim() === '');

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
        <span onClick={toggleCodeVisibility}>
          입장 코드
          <p>{showCode ? roomData?.code : '• • • • • •'}</p>
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

        {!allNoticesEmpty && (
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
        )}
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
`;

export default TopSection;
