import styled from 'styled-components';
import RoomItem from './RoomItem';
import { useHome } from '@/hooks/useHome';
import { useAuthStore } from '@/store/authStore';

function RoomList() {
  const { rooms } = useHome();
  const { isLoggedIn } = useAuthStore();

  // 최소 6개의 RoomItem을 보장
  const roomItems = [
    ...rooms,
    ...Array(Math.max(0, 6 - rooms.length)).fill(null),
  ];

  return (
    <RoomListStyle>
      <div className='info'>
        {isLoggedIn ? (
          rooms.length === 0 ? ( // 스터디룸이 없을 때
            <>
              아직 생성된 스터디룸이 없어요.
              <br />
              간단하게 스터디를 만들고 팀원들에게 입장 코드를 공유하여
              이용해보세요!
            </>
          ) : null // 스터디룸이 있을 경우 아무것도 출력하지 않음
        ) : (
          <>
            로그인하면 스터디룸을 생성할 수 있어요.
            <br />
            원하는 스터디룸을 만들고 팀원들과 학습 목표를 함께 달성하세요!
          </>
        )}
      </div>

      <div className='room-grid'>
        {roomItems.map((room, index) => (
          <RoomItem
            key={index}
            roomName={room ? room.title : ''}
            roomId={room ? room.roomId : undefined}
          />
        ))}
      </div>
    </RoomListStyle>
  );
}

const RoomListStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .info {
    display: flex;
    text-align: center;
    justify-content: center;
    line-height: 150%;
    margin-bottom: 50px;
    color: ${({ theme }) => theme.color_textWhite}95;
    font-size: ${({ theme }) => theme.fontSize_md};
  }

  .room-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 80px;
  }
`;

export default RoomList;
