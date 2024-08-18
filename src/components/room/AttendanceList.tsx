import styled from 'styled-components';
import AttendanceCard from './AttendanceCard';
import { animalIcon } from '@/constants/animals';
import { useRoom } from '@/hooks/useRoom';

function AttendanceList() {
  const { roomData } = useRoom();

  const members = roomData?.members || [];
  return (
    <AttendanceListStyle>
      {members.map((member) => (
        <AttendanceCard
          key={member.profileNum}
          name={member.name}
          attendanceRate={member.attendanceRate}
          icon={animalIcon[member.profileNum]}
        />
      ))}
    </AttendanceListStyle>
  );
}

const AttendanceListStyle = styled.div`
  width: 220px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px 0;

  /* position: sticky;
  position: -webkit-sticky; */
  top: 0;
  left: 0;
`;

export default AttendanceList;
