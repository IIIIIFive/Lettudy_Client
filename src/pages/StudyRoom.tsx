import AttendanceList from '@/components/room/AttendanceList';
import TopSection from '@/components/room/TopSection';

import React, { useState } from 'react';
import styled from 'styled-components';

function StudyRoom() {
  return (
    <StudyRoomStyle>
      <div className='content'>
        <TopSection />
      </div>
      <AttendanceList />
    </StudyRoomStyle>
  );
}

export default StudyRoom;

const StudyRoomStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 75px;
  padding: 40px 0 100px;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
