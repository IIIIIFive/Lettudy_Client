import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface RoomItemProps {
  roomName: string;
  roomId?: string;
}

function RoomItem({ roomName, roomId }: RoomItemProps) {
  const navigate = useNavigate();
  const isPlaceholder = !roomName;

  return (
    <RoomItemStyle
      isPlaceholder={isPlaceholder}
      onClick={() => navigate(`/room/${roomId}`)}>
      <div className='room'>
        <div className='folder'>
          <img
            className='image'
            src='/assets/images/folder.png'
            alt='folder'
            width={180}
          />
        </div>
        <h3>
          {isPlaceholder ? (
            <img src='/assets/images/question.png' alt='question' width={50} />
          ) : (
            roomName
          )}
        </h3>
      </div>
    </RoomItemStyle>
  );
}

const RoomItemStyle = styled.div<{ isPlaceholder: boolean }>`
  display: flex;
  background-color: ${({ theme }) => theme.color_bgWhite}90;
  padding: ${({ isPlaceholder }) =>
    isPlaceholder ? '30px 70px 30px 70px' : '30px 70px 50px 70px'};
  border-radius: 15px;
  transition: box-shadow 0.3s ease-in-out;
  opacity: ${({ isPlaceholder }) => (isPlaceholder ? 0.5 : 1)};
  pointer-events: ${({ isPlaceholder }) => (isPlaceholder ? 'none' : 'auto')};

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }

  .room {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      padding-left: 10px;
    }
  }
`;

export default RoomItem;
