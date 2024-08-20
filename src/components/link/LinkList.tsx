import LinkItem from './LinkItem';
import styled from 'styled-components';

import { Links } from '@/model/link.model';

interface LinkListProps {
  links: Links[];
  onDelete: (id: string) => void;
}

function LinkList({ links, onDelete }: LinkListProps) {
  return (
    <LinkListStyle>
      <div className='container'>
        <div className='info'>
          <img src='/assets/images/linkbox.png' alt='linkbox' width={43} />
        </div>
        <p className='description'>링크들을 한 곳에 모아 편하게 관리하세요!</p>
        <div className='link-container'>
          {links.length === 0 ? (
            <div className='empty-message'>
              <p>아직 링크함이 비어있어요!</p>
            </div>
          ) : (
            links.map((link) => (
              <LinkItem
                key={link.id}
                url={link.link}
                linkName={link.title}
                onDelete={() => onDelete(link.id)}
              />
            ))
          )}
        </div>
      </div>
    </LinkListStyle>
  );
}

export default LinkList;

const LinkListStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .container {
    height: 70vh;
    background: ${({ theme }) => theme.color_bgWhite};
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    padding: 30px 18px;
    display: flex;
    flex-direction: column;
  }

  .info {
    text-align: center;
  }

  .description,
  .empty-message p {
    text-align: center;
    color: #7d7d7d;
    font-size: ${({ theme }) => theme.fontSize_sm};
    margin: 10px 0 20px;
  }

  .link-container {
    flex: 1;
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 12px;
    overflow-y: auto;
    height: 63vh;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      margin: 7px 0 0 0;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.color_borderGray};
      border-radius: 10px;
    }
  }

  .empty-message {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    p {
      color: #7d7d7d;
      font-size: ${({ theme }) => theme.fontSize_xs};
      text-align: center;
    }
  }
`;
