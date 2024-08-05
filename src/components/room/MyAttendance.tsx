import styled from 'styled-components';

interface MyAttendanceProps {
  id: number;
  date: string;
  attendance: boolean;
}

const DummyData: MyAttendanceProps[] = [
  { id: 1, date: '8월 6일 20시', attendance: true },
  { id: 2, date: '7월 26일 20시', attendance: true },
  { id: 3, date: '7월 22일 20시', attendance: false },
  { id: 4, date: '7월 18일 20시', attendance: true },
  { id: 5, date: '7월 16일 20시', attendance: false },
  { id: 6, date: '7월 5일 20시', attendance: true },
  { id: 7, date: '7월 2일 20시', attendance: true },
];

function MyAttendance() {
  return (
    <MyAttendanceStyle>
      <h4>나의 출석 기록</h4>
      <div className='table-box'>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>출석여부</th>
            </tr>
          </thead>
        </table>
        <div className='table-body-container'>
          <table>
            <tbody>
              {DummyData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>
                    {item.attendance ? (
                      <img src='/assets/icon/check-icon.svg' alt='check' />
                    ) : (
                      <img src='/assets/icon/x-icon.svg' alt='x' />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    max-height: 275px;
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
      max-height: 220px;
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
