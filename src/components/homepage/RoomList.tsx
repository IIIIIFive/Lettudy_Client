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
  padding: 50px 100px;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    height: 10px; /* 스크롤바 높이 */
    background-color: transparent; /* 스크롤바 배경을 투명으로 설정 */
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* WebKit 기반 브라우저 */
  }
`;

export default RoomList;
