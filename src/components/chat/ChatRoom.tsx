import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chat } from '../../types/chat';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';

interface ChatRoomProps {
  visible: boolean;
  onClose: () => void;
}

function ChatRoom({ visible, onClose }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Chat[]>([
    {
      userName: '김이름',
      avatar: '/assets/animal/fox.png',
      content: '팀원 대화 입니다.',
      date: '오후 12:10',
      roomId: '1',
    },
    {
      userName: '박이름',
      avatar: '/assets/animal/panda.png',
      content: '팀원 대화~~~~',
      date: '오후 12:11',
      roomId: '1',
    },
  ]);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      const now = new Date();
      const date = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: message, userName: 'me', date, roomId: '1' },
      ]);
      setMessage('');
      setIsMessageSent(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isMessageSent) {
      setIsMessageSent(false);
    }
  }, [messages]);

  const filteredMessages = messages.filter((msg) => msg.roomId === '1');

  return (
    <ChatRoomStyle>
      <div className={`chat-room ${visible ? 'visible' : ''}`}>
        <ChatHeader onClose={onClose} />
        <ChatContent
          messages={filteredMessages}
          isMessageSent={isMessageSent}
        />
        <ChatInput
          message={message}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </ChatRoomStyle>
  );
}

export default ChatRoom;

const ChatRoomStyle = styled.div`
  .chat-room {
    position: fixed;
    right: 0;
    top: 0;
    width: 330px;
    height: 100vh;
    background-color: ${({ theme }) => theme.color_bgWhite};
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    cursor: default;
    z-index: 1;
  }

  .chat-room.visible {
    transform: translateX(0);
  }
`;
