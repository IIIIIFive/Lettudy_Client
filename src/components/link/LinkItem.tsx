import styled from 'styled-components';

interface LinkItemProps {
  url: string;
  linkName: string;
  onDelete: () => void;
}

function LinkItem({ url, linkName, onDelete }: LinkItemProps) {
  const onLinkClick = () => {
    const fullUrl = url.startsWith('http') ? url : `http://${url}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <LinkItemStyle>
      <img src='/assets/images/link.png' alt='link' width={24} />
      <span className='link-name' onClick={onLinkClick}>
        {linkName}
      </span>
      <img
        className='close'
        src='/assets/icon/close-icon.svg'
        alt='close'
        width={9}
        onClick={onDelete}
      />
    </LinkItemStyle>
  );
}

export default LinkItem;

const LinkItemStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 15px 12px;
  background-color: ${({ theme }) => theme.color_bgWhite};
  border: 1px solid #cbcbcb;
  border-radius: 12px;
  position: relative;

  &:hover {
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  }

  .link-name {
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize_reg};
    font-weight: 500;
    color: ${({ theme }) => theme.color_textKey};
    flex: 1;
    cursor: pointer;
    margin-right: 40px;
  }

  img {
    margin-left: 22px;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .close {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .close {
    opacity: 1;
  }
`;
