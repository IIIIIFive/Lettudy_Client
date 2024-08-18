import styled from 'styled-components';

function EmptyAttendance() {
  return (
    <EmptyAttendanceStyle>
      <div className='cal'>
        <img src='/assets/images/empty.png' alt='logo' width={50} />
      </div>
      <div className='empty-message'>
        <img src='/assets/icon/back-icon.svg' alt='arrow' width={10} />
        캘린더에서 출석을 생성해 보세요!
      </div>
    </EmptyAttendanceStyle>
  );
}

const EmptyAttendanceStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 100px 0;
  color: ${({ theme }) => theme.color_textGray};
  font-size: ${({ theme }) => theme.fontSize_xs};
  gap: 20px;

  .empty-message {
    img {
      margin-right: 7px;
    }
  }
`;

export default EmptyAttendance;
