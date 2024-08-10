import { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@/pages/LinkManager';

interface LinkInputProps {
  addLink: (link: Omit<Link, 'id'>) => void;
}

function LinkInput({ addLink }: LinkInputProps) {
  const [linkName, setLinkName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (linkName && url) {
      addLink({ linkName, url });
      setLinkName('');
      setUrl('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <LinkInputStyle>
      <div className='container'>
        <label className='input-label'>
          <h5>링크 이름</h5>
          <input
            className='link-name'
            type='text'
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <label className='input-label'>
          <h5>링크 URL</h5>
          <input
            className='link-url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <div className='link-add' onClick={handleSubmit}>
          <img src='/assets/images/plus.png' alt='plus' width={15} />
          <h5>추가하기</h5>
        </div>
      </div>
    </LinkInputStyle>
  );
}

export default LinkInput;

const LinkInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
  width: 100%;

  .container {
    height: 100%;
    min-height: 250px;
    background: ${({ theme }) => theme.color_bgWhite};
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    padding: 42px;
    display: flex;
    flex-direction: column;
  }

  .input-label {
    flex-direction: column;
    margin-bottom: 24px;

    h5 {
      margin-bottom: 12px;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      outline: none;
      width: 100%;
    }
  }

  .link-add {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    margin-top: auto;

    img {
      margin-right: 8px;
    }
  }
`;
