import styled, { css } from 'styled-components';

interface NormalButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

function NormalButton({
  text,
  onClick,
  disabled = false,
  size = 'medium',
}: NormalButtonProps) {
  return (
    <NormalButtonStyle
      type='button'
      onClick={onClick}
      disabled={disabled}
      size={size}>
      {text}
    </NormalButtonStyle>
  );
}

export default NormalButton;

const NormalButtonStyle = styled.button<{
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) =>
    size === 'small'
      ? '8px 12px'
      : size === 'medium'
        ? '10px 20px'
        : '10px 24px'};
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color_key};
  color: ${({ theme }) => theme.color_textWhite};
  font-size: ${({ theme, size }) =>
    size === 'small'
      ? theme.fontSize_xxs
      : size === 'medium'
        ? theme.fontSize_xs
        : theme.fontSize_sm};
  font-weight: 900;
  cursor: pointer;
  transition:
    opacity 0.3s,
    box-shadow 0.3s;
  white-space: nowrap;

  &:disabled {
    background-color: ${({ theme }) => theme.color_key}80;
    cursor: not-allowed;
    box-shadow: none;
  }

  ${({ size, disabled }) =>
    size === 'large' &&
    !disabled &&
    css`
      box-shadow: none;
      &:hover {
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      }
    `}
`;
