import styled from 'styled-components';

interface NormalButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function NormalButton({ text, onClick, disabled = false }: NormalButtonProps) {
  return (
    <NormalButtonStyle type='button' onClick={onClick} disabled={disabled}>
      {text}
    </NormalButtonStyle>
  );
}

export default NormalButton;

const NormalButtonStyle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color_key};
  color: ${({ theme }) => theme.color_textWhite};
  font-size: ${({ theme }) => theme.fontSize_xs};
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover:not(:disabled) {
    opacity: 0.95;
  }

  &:disabled {
    background-color: #cfd3d8;
    cursor: not-allowed;
  }
`;
