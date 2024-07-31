import styled from 'styled-components';

function HomePage() {
  return (
    <HomePageStyle>
      <div className='buttons'>
        <div className='icon'>
          <img
            className='plus'
            src='/assets/icon/plus-icon.svg'
            alt='plus'
            width={30}
          />
          <span>스터디 생성</span>
        </div>
        <div className='icon'>
          <img
            src='/assets/icon/add-person-icon.svg'
            alt='add-person'
            width={40}
          />
          <span>스터디 입장</span>
        </div>
      </div>
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  position: relative;

  .buttons {
    position: absolute;
    right: 75px;
    top: 50px;
    display: flex;
    padding: 50px 70px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color_bgWhite};
    border: 2px dashed ${({ theme }) => theme.color_borderGray};
    gap: 30px;

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      span {
        color: ${({ theme }) => theme.color_textGray};
        font-size: ${({ theme }) => theme.fontSize_lg};
      }

      .plus {
        padding-top: 5px;
      }
    }
  }
`;

export default HomePage;
