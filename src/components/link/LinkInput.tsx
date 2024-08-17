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
          <h4>링크 이름</h4>
          <input
            className='link-name'
            type='text'
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={30}
          />
        </label>
        <label className='input-label'>
          <h4>링크 URL</h4>
          <input
            className='link-url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <div className='link-add' onClick={handleSubmit}>
          <img src='/assets/images/plus.png' alt='plus' width={25} />
          <h4>추가하기</h4>
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
  min-height: 247px;
  max-height: 247.5px;
  width: 100%;

  .container {
    background: ${({ theme }) => theme.color_bgWhite};
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    padding: 50px 46px;
    display: flex;
    flex-direction: column;
  }

  .input-label {
    flex-direction: column;
    margin-bottom: 18px;

    h4 {
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
    margin-top: 18px;

    img {
      margin-right: 8px;
    }
  }
`;
