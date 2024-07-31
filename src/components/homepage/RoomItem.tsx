import styled from 'styled-components';

interface RoomItemProps {
  roomName: string;
}
function RoomItem({ roomName }: RoomItemProps) {
  return (
    <RoomItemStyle>
      <div className='room'>
        <div className='folder'>
          <img
            className='image'
            src='/assets/images/folder.png'
            alt='folder'
            width={250}
          />
        </div>

        <span>{roomName}</span>
      </div>
    </RoomItemStyle>
  );
}

const RoomItemStyle = styled.div`
  display: flex;

  .folder {
    background-color: ${({ theme }) => theme.color_bgWhite};
    padding: 50px;
    border-radius: 15px;
  }
  .room {
    display: flex;

    flex-direction: column;
    span {
      padding-top: 30px;
      text-align: center;
      color: ${({ theme }) => theme.color_textBlack};
      font-size: ${({ theme }) => theme.fontSize_md};
      font-weight: 700;
    }

    .folder {
      transition: box-shadow 0.3s ease-in-out;
    }
    .folder:hover {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
  }
`;

export default RoomItem;
