import styled from 'styled-components';

function TopSection() {
  return (
    <TopSectionStyle>
      <div className='title'>
        <h2>JS 알고리즘 스터디</h2>
        <img
          src='/assets/images/placard.png'
          alt='placard'
          width={50}
          height={50}
        />
        <span>입장코드: 123456789</span>
      </div>

      <div className='content'>
        <div className='notice'>
          <img src='/assets/icon/dot-icon.svg' alt='dot' />
          매주 화요일, 목요일 20시 코드 리뷰 <br />
        </div>
        <div className='notice'>
          <img src='/assets/icon/dot-icon.svg' alt='dot' />
          스터디 진행 당일 18시까지 문제 풀이 완료하기!
        </div>
        <img
          className='edit-icon'
          src='/assets/icon/edit-icon.svg'
          alt='edit'
          width={30}
        />
      </div>
    </TopSectionStyle>
  );
}

const TopSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    display: flex;
    align-items: center;
    margin: 5px 5px 10px 5px;

    h2 {
      color: ${({ theme }) => theme.color_textBlack};
    }

    span {
      margin-left: auto;
      padding: 6px 10px;
      font-size: ${({ theme }) => theme.fontSize_reg};
      color: ${({ theme }) => theme.color_textKey};
      border: 1px solid ${({ theme }) => theme.color_borderGray};
      border-radius: 5px;
    }
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 22px 40px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 0.3px solid ${({ theme }) => theme.color_borderGray};
    border-radius: 12px;
    gap: 15px;

    .notice {
      color: ${({ theme }) => theme.color_textBlack};
      font-size: ${({ theme }) => theme.fontSize_reg};

      img {
        margin-right: 7px;
      }
    }

    .edit-icon {
      position: absolute;
      cursor: pointer;
      right: 25px;
      top: 25px;
    }
  }
`;

export default TopSection;
