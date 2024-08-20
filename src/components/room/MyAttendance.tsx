import { useRoom } from '@/hooks/useRoom';
import styled from 'styled-components';
import EmptyAttendance from './EmptyAttendance';

function MyAttendance() {
  const { roomData } = useRoom();
  const myAttendance = roomData?.attendanceRecord || [];

  return (
    <MyAttendanceStyle>
      <h4>나의 출석 기록</h4>
      <div className='table-box'>
        {myAttendance.length === 0 ? (
          <EmptyAttendance />
        ) : (
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>출석여부</th>
              </tr>
            </thead>
            <tbody className='table-body-container'>
              {myAttendance.map((attendance, idx) => (
                <tr key={idx}>
                  <td>{attendance.date}</td>
                  <td>
                    {attendance.status ? (
                      <img src='/assets/icon/check-icon.svg' alt='check' />
                    ) : (
                      <img src='/assets/icon/x-icon.svg' alt='x' />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MyAttendanceStyle>
  );
}

const MyAttendanceStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .table-box {
    width: 280px;

    height: 300px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 0.3px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 12px;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    th,
    td {
      height: 50px;
      text-align: center;
      vertical-align: middle;
      border-bottom: 1px solid ${({ theme }) => theme.color_borderGray};
      padding-left: 10px;
    }

    th:first-child,
    td:first-child {
      width: 60%;
    }

    th:last-child,
    td:last-child {
      width: 40%;
    }

    th {
      font-weight: 700;
    }

    td {
      font-weight: 400;
    }

    thead {
      background-color: ${({ theme }) => theme.color_bgWhite};
    }

    .table-body-container {
      max-height: 250px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.color_bgWhite};
        margin: 0 0 7px 0;
      }

      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.color_borderGray};
        border-radius: 10px;
      }
    }
  }
`;

export default MyAttendance;
