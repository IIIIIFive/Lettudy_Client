import BottomSection from '@/components/homepage/BottomSection';
import IntroSection from '@/components/homepage/IntroSection';
import styled from 'styled-components';

function HomePage() {
  return (
    <HomePageStyle>
      <IntroSection />
      <BottomSection />
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .room-list {
    margin-top: 20px;
    width: 100%;
  }
`;

export default HomePage;
