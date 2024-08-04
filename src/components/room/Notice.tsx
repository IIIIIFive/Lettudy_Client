import styled from 'styled-components';

function Notice() {
  return (
    <NoticeStyle>
      <div className='study-name'>
        <h3>JS 알고리즘 스터디</h3>
      </div>
      <div className='notice'>
        매주 화요일, 목요일 20시 코드 리뷰 <br />
        스터디 진행 당일 18시까지 문제 풀이 완료하기!
      </div>
    </NoticeStyle>
  );
}

const NoticeStyle = styled.div``;

export default Notice;
