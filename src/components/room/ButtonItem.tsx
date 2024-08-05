import styled from 'styled-components';

interface ButtonItemProps {
  iconSrc: string;
  iconBgColor: string;
  featName: string;
  onClick: () => void;
}

function ButtonItem({
  iconSrc,
  iconBgColor,
  featName,
  onClick,
}: ButtonItemProps) {
  return (
    <ButtonItemStyle iconBgColor={iconBgColor} onClick={onClick}>
      <button className='icon'>
        <img src={iconSrc} alt='icon' width={30} />
      </button>
      <div className='name'>{featName}</div>
    </ButtonItemStyle>
  );
}

const ButtonItemStyle = styled.div<{ iconBgColor: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 20px;
  background-color: ${({ theme }) => theme.color_bgWhite};

  border-radius: 3px;
  cursor: pointer;

  .icon {
    padding: 12px;
    background-color: ${({ iconBgColor }) => iconBgColor};
    border-radius: 50%;
  }

  .name {
    color: ${({ theme }) => theme.color_textBlack};
    font-size: ${({ theme }) => theme.fontSize_sm};
  }
`;

export default ButtonItem;
