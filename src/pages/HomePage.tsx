import HomeModals from '@/components/homepage/HomeModals';
import RoomList from '@/components/homepage/RoomList';
import { useState } from 'react';
import styled from 'styled-components';

function HomePage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const openJoinModal = () => setJoinModalOpen(true);
  const closeJoinModal = () => setJoinModalOpen(false);

  const handleCreate = (roomName: string) => {};

  const handleJoin = (code: string) => {};

  return (
    <HomePageStyle>
      <div className='buttons'>
        <div className='icon' onClick={openCreateModal}>
          <img
            className='plus'
            src='/assets/icon/plus-icon.svg'
            alt='plus'
            width={25}
          />
          <span>스터디 생성</span>
        </div>
        <div className='icon' onClick={openJoinModal}>
          <img
            src='/assets/icon/add-person-icon.svg'
            alt='add-person'
            width={35}
          />
          <span>스터디 입장</span>
        </div>
      </div>
      <div className='room-list'>
        <RoomList />
        <img className='arrow' src='/assets/icon/arrow-icon.svg' alt='arrow' />
      </div>
      <HomeModals
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        type='create'
        onConfirm={handleCreate}
      />

      <HomeModals
        isOpen={isJoinModalOpen}
        onClose={closeJoinModal}
        type='join'
        onConfirm={handleJoin}
      />
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .buttons {
    align-self: flex-end;
    display: flex;
    padding: 35px 60px;
    margin-right: 50px;
    margin-top: 30px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 2px dashed ${({ theme }) => theme.color_borderGray};
    gap: 30px;

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      cursor: pointer;

      span {
        color: ${({ theme }) => theme.color_textGray};
        font-size: ${({ theme }) => theme.fontSize_md};
      }

      .plus {
        padding-top: 5px;
      }
    }
  }

  .room-list {
    margin-top: 20px;
    width: 100%;

    .arrow {
      margin-left: 120px;
    }
  }
`;

export default HomePage;
