import React from 'react';
import styled from 'styled-components';

interface ChatInputProps {
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

function ChatInput({
  message,
  handleInputChange,
  handleKeyPress,
  handleSendMessage,
}: ChatInputProps) {
  return (
    <ChatInputStyle>
      <input
        type='text'
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <img
        className='plus'
        src='/assets/icon/chat-input-icon.svg'
        alt='input'
        width={35}
        onClick={handleSendMessage}
      />
    </ChatInputStyle>
  );
}

export default ChatInput;

const ChatInputStyle = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ececec;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #e2e2e2;
    border-radius: 15px;
    margin: 0 10px;
    outline: none;
  }

  img {
    cursor: pointer;
  }
`;
