import React from 'react';
import styled from 'styled-components';

function HomepageLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

export default HomepageLayout;

const Container = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;
