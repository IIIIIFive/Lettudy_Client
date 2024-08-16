import styled from 'styled-components';

interface ButtonItemProps {
  iconSrc: string;

  featName: string;
  onClick: () => void;
}

function ButtonItem({
  iconSrc,

  featName,
  onClick,
}: ButtonItemProps) {
  return (
    <ButtonItemStyle onClick={onClick}>
      <button className='icon'>
        <img src={iconSrc} alt='icon' width={45} />
      </button>
      <h4>{featName}</h4>
    </ButtonItemStyle>
  );
}

const ButtonItemStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  gap: 20px;
  background-color: ${({ theme }) => theme.color_bgWhite};
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }

  .icon {
    padding: 10px;
    background-color: #e3f1fe;
    border-radius: 50%;
  }

  .name {
    color: ${({ theme }) => theme.color_textBlack};
    font-size: ${({ theme }) => theme.fontSize_reg};
  }
`;

export default ButtonItem;
