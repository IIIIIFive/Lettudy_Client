import { useRef, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

interface NoticeProps {
  notice: string;
  index: number;
  isEditing: boolean;
  notices: string[];
  setNotices: (notices: string[]) => void;
}

const Notice = ({
  notice,
  index,
  isEditing,
  notices,
  setNotices,
}: NoticeProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newNotices = [...notices, ''];
      setNotices(newNotices);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else if (e.key === 'Backspace' && notices.length > 1 && notice === '') {
      e.preventDefault();
      const newNotices = notices.filter((_, i) => i !== index);
      setNotices(newNotices);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNotices = [...notices];
    newNotices[index] = e.target.value;
    setNotices(newNotices);
  };

  return (
    <NoticeStyle>
      <img src='/assets/icon/dot-icon.svg' alt='dot' />
      {isEditing ? (
        <input
          ref={inputRef}
          value={notice}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='notice-input'
          autoFocus={index === notices.length - 1}
          maxLength={40}
        />
      ) : (
        <span>{notice}</span>
      )}
    </NoticeStyle>
  );
};

const NoticeStyle = styled.div`
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
`;

export default Notice;
