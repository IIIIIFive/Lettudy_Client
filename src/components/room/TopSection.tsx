import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import ButtonList from './ButtonList';

function TopSection() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [notices, setNotices] = useState<string[]>([
    '매주 화요일, 목요일 20시 코드 리뷰',
    '스터디 진행 당일 18시까지 문제 풀이 완료하기!🔥',
  ]);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEditClick = (): void => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTimeout(() => contentRef.current?.focus(), 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, index: number): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newNotices = [...notices, ''];
      setNotices(newNotices);
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }, 0);
    } else if (
      e.key === 'Backspace' &&
      notices.length > 1 &&
      notices[index] === ''
    ) {
      e.preventDefault();
      const newNotices = notices.filter((_, i) => i !== index);
      setNotices(newNotices);
      setTimeout(() => {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus();
        }
      }, 0);
    }
  };

  const handleChange = (index: number, value: string): void => {
    const newNotices = [...notices];
    newNotices[index] = value;
    setNotices(newNotices);
  };
  return (
    <TopSectionStyle>
      <div className='title'>
        <h2>JS 알고리즘 스터디</h2>
        <img
          src='/assets/images/placard.png'
          alt='placard'
          width={50}
          height={50}
        />
        <span>입장코드: 123456789</span>
      </div>

      <div className='content' ref={contentRef}>
        <div className='notice-box'>
          {notices.map((notice, index) => (
            <div key={index} className='notice'>
              <img src='/assets/icon/dot-icon.svg' alt='dot' />
              {isEditing ? (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={notice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(e, index)
                  }
                  className='notice-input'
                  autoFocus={index === notices.length - 1}
                  maxLength={40}
                />
              ) : (
                <span>
                  {notice || '공지 사항 또는 스터디 내의 규칙을 입력해주세요!'}
                </span>
              )}
            </div>
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
      font-size: ${({ theme }) => theme.fontSize_reg};
      color: ${({ theme }) => theme.color_textKey};
      border: 1px solid ${({ theme }) => theme.color_borderGray};
      border-radius: 5px;
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

    .notice {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.color_textBlack};
      font-size: ${({ theme }) => theme.fontSize_reg};
      margin-right: 40px;

      img {
        margin-right: 7px;
      }

      .notice-input {
        font-family: 'Noto Sans KR';
        flex: 1;
        width: 100%;
        border: none;
        outline: none;
        background: none;

        font-size: ${({ theme }) => theme.fontSize_reg};
        color: ${({ theme }) => theme.color_textBlack};
      }
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
