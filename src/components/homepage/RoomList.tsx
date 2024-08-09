import styled from 'styled-components';
import RoomItem from './RoomItem';

const studyRooms = [
  'React + TS',
  'React + TS',
  'React + TS',
  'React + TS',
  'React + TS',
];

function RoomList() {
  // 최소 6개의 RoomItem을 보장
  const roomItems = [...studyRooms, ...Array(6 - studyRooms.length).fill('')];

  return (
    <RoomListStyle>
      {roomItems.map((name, index) => (
        <RoomItem key={index} roomName={name} />
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
