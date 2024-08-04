import styled from 'styled-components';

interface ChatHeaderProps {
  onClose: () => void;
}

function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <ChatHeaderStyle>
      <h2>Chat</h2>
      <img
        className='close'
        src='/assets/icon/close-icon.svg'
        alt='close'
        width={10}
        onClick={onClose}
      />
    </ChatHeaderStyle>
  );
}

export default ChatHeader;

const ChatHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.color_bgWhite};

  h2 {
    flex: 1;
    text-align: center;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize_reg};
    font-weight: bold;
  }

  img {
    margin-left: auto;
    cursor: pointer;
  }
`;
