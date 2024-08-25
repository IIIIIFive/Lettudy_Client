import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { createSocket } from './socket';
import { useUserData } from '@/hooks/useUserData';

interface ChatRoomProps {
  visible: boolean;
  onClose: () => void;
}

function ChatRoom({ visible, onClose }: ChatRoomProps) {
  const { user } = useUserData();
  const { roomId } = useParams<{ roomId: string }>();
  const [message, setMessage] = useState('');
  const [isMessageSent] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  const { data: chatData, refetch } = useChat(roomId || '');

  useEffect(() => {
    if (roomId) {
      const newSocket = createSocket(roomId);
      setSocket(newSocket);

      newSocket.on('chat', () => {
        refetch();
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('chat', {
        userId: user?.id,
        content: message,
      });
      setMessage('');
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

  return (
    <ChatRoomStyle>
      <div className={`chat-room ${visible ? 'visible' : ''}`}>
        <ChatHeader onClose={onClose} />
        <ChatContent
          messages={chatData?.chats || []}
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
