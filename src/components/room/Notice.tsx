import { useRef, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';

interface NoticeProps {
  notice: string;
  index: number;
  isEditing: boolean;
  notices: string[];
  setNotices: (notices: string[]) => void;
}

function Notice({
  notice,
  index,
  isEditing,
  notices,
  setNotices,
}: NoticeProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInputAt = (idx: number) => {
    (
      document.querySelectorAll('.notice-input')[idx] as HTMLInputElement
    )?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const newNotices = [...notices];
    if (e.key === 'Enter') {
      e.preventDefault();
      newNotices.splice(index + 1, 0, '');
      setNotices(newNotices);
      focusInputAt(index + 1);
    } else if (e.key === 'Backspace' && !notice && notices.length > 1) {
      e.preventDefault();
      setNotices(newNotices.filter((_, i) => i !== index));
      focusInputAt(Math.max(index - 1, 0));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotices(notices.map((n, i) => (i === index ? e.target.value : n)));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!inputRef.current?.contains(event.target as Node)) {
        setNotices(notices.filter((n) => n.trim()));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notices, setNotices]);

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
}

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
