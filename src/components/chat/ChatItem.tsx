import styled from 'styled-components';
import { Chats } from '@/model/chat.model';
import { animalIcon } from '@/constants/animals';
import { formatChatDate } from '@/utils/formatChatDate';
import { useUserData } from '@/hooks/useUserData';

interface ChatItemProps {
  message: Chats;
}

function ChatItem({ message }: ChatItemProps) {
  const { user } = useUserData();

  if (!user) return null;

  const isUserMessage = message.sender === user?.name;

  return (
    <ChatItemStyle $isUserMessage={isUserMessage}>
      <div className='chat-container'>
        {!isUserMessage && message.profileNum && (
          <img
            src={animalIcon[message.profileNum]}
            alt={message.sender}
            className='avatar'
          />
        )}
        <div className='chat-box'>
          {!isUserMessage && <div className='user-name'>{message.sender}</div>}
          <p className='chat-text'>{message.content}</p>
          <div className='date'>{formatChatDate(message.createdAt)}</div>
        </div>
      </div>
    </ChatItemStyle>
  );
}

export default ChatItem;

const ChatItemStyle = styled.div<{
  $isUserMessage: boolean;
}>`
  .chat-container {
    display: flex;
    align-items: center;
    margin: 12px 0;
    width: 100%;
    justify-content: ${({ $isUserMessage }) =>
      $isUserMessage ? 'flex-end' : 'flex-start'};
    text-align: ${({ $isUserMessage }) => ($isUserMessage ? 'right' : 'left')};
  }

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin: 0 8px;
    order: ${({ $isUserMessage }) => ($isUserMessage ? 1 : 0)};
  }

  .chat-box {
    display: inline-block;
    max-width: 80%;
  }

  .user-name {
    margin: 0 0 6px 5px;
    font-size: ${({ theme }) => theme.fontSize_sm};
    font-weight: 500;
    color: ${({ theme }) => theme.color_textBlack};
  }

  .chat-text {
    background-color: ${({ $isUserMessage, theme }) =>
      $isUserMessage ? '#efefef' : theme.color_key};
    padding: 12px 16px;
    border-radius: 15px;
    word-wrap: break-word;
    word-break: break-word;
    color: ${({ $isUserMessage, theme }) =>
      $isUserMessage ? theme.color_textBlack : theme.color_textWhite};
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    text-align: left;
    display: inline-block;
    max-width: 100%;
    min-width: 30px;
    line-height: 120%;
  }

  .date {
    font-size: ${({ theme }) => theme.fontSize_xxs};
    color: #777777;
    margin: 6px 8px 0 6px;
    text-align: ${({ $isUserMessage }) => ($isUserMessage ? 'right' : 'left')};
  }
`;
