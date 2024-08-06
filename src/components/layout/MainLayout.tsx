import React from 'react';
import styled from 'styled-components';

function MainLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

export default MainLayout;

const Container = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
`;
