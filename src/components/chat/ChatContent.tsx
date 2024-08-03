import React from 'react';
import styled from 'styled-components';
import { Chat } from '../../types/chat';
import ChatItem from './ChatItem';

interface ChatContentProps {
  messages: Chat[];
}

function ChatContent({ messages }: ChatContentProps) {
  return (
    <ChatContentStyle>
      {messages.map((msg, index) => (
        <ChatItem key={index} message={msg} />
      ))}
    </ChatContentStyle>
  );
}

export default ChatContent;

const ChatContentStyle = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
