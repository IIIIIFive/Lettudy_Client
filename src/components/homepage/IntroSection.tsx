import styled from 'styled-components';

function IntroSection() {
  return (
    <IntroSectionStyle>
      <div className='content'>
        <h1>Let's Study!</h1>
        <h2>렛터디가 공부에만 집중할 수 있게 도와드릴게요</h2>
        <span>
          일정 관리, 소통, 기록 등 다양한 기능으로 스터디 관리가 더욱 편해질
          거예요!
        </span>
      </div>
      <img
        src='/assets/images/calendar-with-clock.png'
        alt='calendar-with-clock'
        width='450vw'
      />
    </IntroSectionStyle>
  );
}

const IntroSectionStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 70px 20px 180px;
  gap: 30px;

  .content {
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 30px;
    }
    span {
      font-size: ${({ theme }) => theme.fontSize_reg};
      color: ${({ theme }) => theme.color_textGray};
      margin-top: 10px;
    }
    display: flex;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
`;

export default IntroSection;
