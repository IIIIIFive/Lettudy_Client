import { useUserData } from '@/hooks/useUserData';
import styled from 'styled-components';

type AttendanceCardProps = {
  name: string;
  attendanceRate: number;
  icon: string;
};

function AttendanceCard({ name, attendanceRate, icon }: AttendanceCardProps) {
  const { user } = useUserData();

  const isCurrentUser = name === user?.name;

  return (
    <AttendanceCardStyle isCurrentUser={isCurrentUser}>
      <img src={icon} alt='animal icon' width={75} />
      <div className='info'>
        <h4>{name}</h4>
        <div className='attendance'>
          출석률
          <span> {attendanceRate}%</span>
        </div>
      </div>
    </AttendanceCardStyle>
  );
}

const AttendanceCardStyle = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 120px;
  background-color: ${({ theme }) => theme.color_bgWhite};
  border-radius: 12px;
  gap: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border: ${({ isCurrentUser, theme }) =>
    isCurrentUser ? `3px solid ${theme.color_textLightOrange}` : 'none'};

  .info {
    display: flex;
    flex-direction: column;
    gap: 12px;

    h4 {
      color: ${({ theme }) => theme.color_textBlack};
    }

    .attendance {
      font-size: ${({ theme }) => theme.fontSize_xs};

      span {
        font-weight: 700;
        padding-left: 3px;
      }
    }
  }
`;

export default AttendanceCard;
