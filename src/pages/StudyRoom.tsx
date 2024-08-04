import AttendanceList from '@/components/room/AttendanceList';
import Notice from '@/components/room/Notice';
import React, { useState } from 'react';
import styled from 'styled-components';

function StudyRoom() {
  return (
    <StudyRoomStyle>
      <div className='content'>
        <Notice />
      </div>
      <AttendanceList />
    </StudyRoomStyle>
  );
}

export default StudyRoom;

const StudyRoomStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  padding: 40px 0 100px;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
