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
  padding: 12px 40px;
  background-color: ${({ theme }) => theme.color_key};
  color: ${({ theme }) => theme.color_bgWhite};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize_reg};
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  }

  img {
    margin: 3px 0 0 5px;
  }
`;
