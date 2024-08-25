import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  size: 'small' | 'medium';
  onClick: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

function Button({
  children,
  size,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <ButtonStyle type={type} $size={size} onClick={onClick} disabled={disabled}>
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
  padding: 12px;
  width: ${({ $size }) => ($size === 'small' ? '80px ' : '200px')};
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.color_textWhite};
  background-color: ${({ theme }) => theme.color_key};
  border-radius: ${({ $size }) => ($size === 'small' ? '8px ' : '12px')};
  font-weight: ${({ $size }) => ($size === 'small' ? '500' : '700')};
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: ${({ $size }) =>
      $size === 'medium' ? '0px 4px 12px rgba(0, 0, 0, 0.2);' : 'none'};
  }
`;
