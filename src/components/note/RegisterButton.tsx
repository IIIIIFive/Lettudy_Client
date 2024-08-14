import styled from 'styled-components';

interface RegisterButtonProps {
  text: string;
  onClick: (event: React.FormEvent) => void;
}

function RegisterButton({ onClick, text }: RegisterButtonProps) {
  return (
    <RegisterButtonStyle onClick={onClick}>
      {text}
      <img src='/assets/icon/register-icon.svg' alt='register' width={17} />
    </RegisterButtonStyle>
  );
}

export default RegisterButton;

const RegisterButtonStyle = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.color_key};
  color: ${({ theme }) => theme.color_bgWhite};
  border: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize_sm};
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  img {
    margin-left: 3px;
    top: 2px;
  }
`;
