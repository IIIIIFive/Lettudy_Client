import styled from 'styled-components';
import NormalButton from '../common/NormalButton';

function Attendance() {
  return (
    <AttendanceStyle>
      <div className='title'>
        <h4>출석하기</h4>
        <img src='/assets/icon/info-icon.svg' alt='info' />
      </div>

      <div className='attendance-box'>
        <h5>8월 6일 20시</h5>
        <NormalButton
          text='출석하기'
          size='large'
          disabled={false}
          onClick={() => {}}
        />
      </div>
    </AttendanceStyle>
  );
}

const AttendanceStyle = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 20px;

  .title {
    display: flex;
    gap: 10px;
  }
  .attendance-box {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 80px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 0.3px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 12px;
    gap: 25px;
  }
`;

export default Attendance;
