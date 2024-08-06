import React from 'react';
import styled from 'styled-components';

function AuthBackground(props: { children: React.ReactNode }) {
  return <AuthBackgroundStyle>{props.children}</AuthBackgroundStyle>;
}

export default AuthBackground;

const AuthBackgroundStyle = styled.div`
  background-image: url('/assets/images/auth-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f5f5f5;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
