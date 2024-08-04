import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Chat } from '../../types/chat';
import ChatItem from './ChatItem';

interface ChatContentProps {
  messages: Chat[];
  isMessageSent: boolean;
}

function ChatContent({ messages, isMessageSent }: ChatContentProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMessageSent) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMessageSent]);

  return (
    <ChatContentStyle>
      {messages.map((msg, index) => (
        <ChatItem key={index} message={msg} />
      ))}
      <div ref={messageEndRef} />
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

  &::-webkit-scrollbar {
    width: 2px;
  }
`;
