import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  size: 'small' | 'medium';
  onClick: () => void;
  disabled?: boolean;
}

function Button({ children, size, onClick, disabled = false }: ButtonProps) {
  return (
    <ButtonStyle
      type='button'
      $size={size}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </ButtonStyle>
  );
}

export default Button;

const ButtonStyle = styled.button<{
  $size: 'small' | 'medium';
}>`
  font-size: ${({ theme, $size }) =>
    $size === 'small' ? theme.fontSize_xs : theme.fontSize_sm};
  padding: 10px;
  width: ${({ $size }) => ($size === 'small' ? '80px ' : '200px')};
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.textWhite};
  background-color: #feac3e;
  border-radius: 15px;
  font-weight: ${({ $size }) => ($size === 'small' ? '300' : '700')};
  box-shadow: ${({ $size }) =>
    $size === 'medium' ? '0px 3px 0px 0px #3333' : 'none'};
`;
