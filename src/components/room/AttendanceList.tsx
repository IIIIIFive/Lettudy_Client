import styled from 'styled-components';
import AttendanceCard from './AttendanceCard';
import { animalIcon } from '@/constants/animals';

type Member = {
  id: number;
  name: string;
  attendanceRate: number;
};

const DummyData: Member[] = [
  { id: 1, name: '강정윤', attendanceRate: 85 },
  { id: 2, name: '박은지', attendanceRate: 92 },
  { id: 3, name: '송호진', attendanceRate: 78 },
  { id: 4, name: '연하영', attendanceRate: 88 },
  { id: 5, name: '강정윤', attendanceRate: 94 },
  { id: 6, name: '박은지', attendanceRate: 81 },
  { id: 7, name: '송호진', attendanceRate: 79 },
  { id: 8, name: '연하영', attendanceRate: 97 },
];

function AttendanceList() {
  return (
    <AttendanceListStyle>
      {DummyData.map((member) => (
        <AttendanceCard
          key={member.id}
          name={member.name}
          attendanceRate={member.attendanceRate}
          icon={animalIcon[member.id]}
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

  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
`;

export default AttendanceList;
