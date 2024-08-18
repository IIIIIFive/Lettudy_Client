import styled from 'styled-components';
import RoomItem from './RoomItem';
import { useHome } from '@/hooks/useHome';

function RoomList() {
  const { rooms } = useHome();

  // 최소 6개의 RoomItem을 보장
  const roomItems = [
    ...rooms,
    ...Array(Math.max(0, 6 - rooms.length)).fill(null),
  ];

  return (
    <RoomListStyle>
      {roomItems.map((room, index) => (
        <RoomItem
          key={index}
          roomName={room ? room.title : ''}
          roomId={room ? room.roomId : undefined}
        />
      ))}
    </RoomListStyle>
  );
}

const RoomListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 80px;
  padding: 50px 0;
`;

export default RoomList;
