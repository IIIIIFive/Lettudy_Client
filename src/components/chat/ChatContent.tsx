import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';
import { Chats } from '@/model/chat.model';
import { useUserData } from '@/hooks/useUserData';

interface ChatContentProps {
  messages: Chats[];
  isMessageSent: boolean;
}

function ChatContent({ messages, isMessageSent }: ChatContentProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUserData();

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMessageSent]);

  return (
    <ChatContentStyle>
      {messages.map((msg) => (
        <ChatItem key={msg.chatItemId} message={msg} user={user} />
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
