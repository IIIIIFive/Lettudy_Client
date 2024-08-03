import React from 'react';
import styled from 'styled-components';
import { Chat } from '../../types/chat';

interface ChatItemProps {
  message: Chat;
}

function ChatItem({ message }: ChatItemProps) {
  return (
    <ChatItemStyle $user={message.userName}>
      <div className='chat-container'>
        {message.userName !== 'me' && message.avatar && (
          <img src={message.avatar} alt={message.userName} className='avatar' />
        )}
        <div className='chat-box'>
          {message.userName !== 'me' && (
            <div className='user-name'>{message.userName}</div>
          )}
          <p className='chat-text'>{message.content}</p>
          {message.date && <div className='date'>{message.date}</div>}
        </div>
      </div>
    </ChatItemStyle>
  );
}

export default ChatItem;

const ChatItemStyle = styled.div<{ $user: string }>`
  .chat-container {
    display: flex;
    align-items: center;
    margin: 8px 0;
    width: 100%;
    justify-content: ${({ $user }) =>
      $user === 'me' ? 'flex-end' : 'flex-start'};
    text-align: ${({ $user }) => ($user === 'me' ? 'right' : 'left')};
  }

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin: 0 8px;
  }

  .chat-box {
    display: inline-block;
    max-width: 80%;
  }

  .user-name {
    margin: 0 0 6px 5px;
    font-size: ${({ theme }) => theme.fontSize_xs};
    color: ${({ theme }) => theme.color_textBlack};
  }

  .chat-text {
    background-color: ${({ $user, theme }) =>
      $user === 'me' ? '#efefef' : theme.color_key};
    padding: 12px;
    border-radius: 15px;
    word-wrap: break-word;
    word-break: break-word;
    color: ${({ $user, theme }) =>
      $user === 'me' ? theme.color_textBlack : theme.color_textWhite};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    text-align: left;
    display: inline-block;
    max-width: 100%;
    min-width: 30px;
  }

  .date {
    font-size: ${({ theme }) => theme.fontSize_xxs};
    color: #777777;
    margin: 6px 8px 0 6px;
  }
`;
