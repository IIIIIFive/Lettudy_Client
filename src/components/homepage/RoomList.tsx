import styled from 'styled-components';
import RoomItem from './RoomItem';
import { useRef } from 'react';

const studyRooms = [
  'React + TS',
  '알고리즘',
  'Node 스터디',
  '네트워크',
  'CS 면접 대비',
];

function RoomList() {
  const roomListRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (roomListRef.current) {
      roomListRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <RoomListStyle ref={roomListRef} onWheel={handleWheel}>
      {studyRooms.map((name, index) => (
        <RoomItem key={index} roomName={name} />
      ))}
    </RoomListStyle>
  );
}

const RoomListStyle = styled.div`
  display: flex;
  gap: 100px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 50px 0;
  overflow-x: hidden;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RoomList;
