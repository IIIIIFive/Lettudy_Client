import React from 'react';
import styled from 'styled-components';

interface AlarmButtonProps {
  alarm: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function AlarmButton({ alarm, onClick, children }: AlarmButtonProps) {
  return (
    <AlarmButtonStyle $alarm={alarm} onClick={onClick}>
      {children}
    </AlarmButtonStyle>
  );
}

export default AlarmButton;

const AlarmButtonStyle = styled.button<{ $alarm: boolean }>`
  width: 80px;
  height: 32px;
  background-color: ${({ theme, $alarm }) =>
    $alarm ? theme.color_textLightOrange : theme.color_key};
  color: ${({ theme, $alarm }) =>
    $alarm ? theme.color_textOrange : theme.color_textLightOrange};
  font-size: ${({ theme }) => theme.fontSize_xs};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
