import { useState } from 'react';
import styled from 'styled-components';
import LinkInput from '../components/link/LinkInput';
import LinkList from '../components/link/LinkList';
import BackButton from '@/components/common/BackButton';

export interface Link {
  id: number;
  linkName: string;
  url: string;
}

function LinkManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [nextId, setNextId] = useState(1);

  const addLink = (link: Omit<Link, 'id'>) => {
    const newLink = { ...link, id: nextId };
    setLinks([...links, newLink]);
    setNextId(nextId + 1);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <LinkManagerStyle>
      <BackButton text='자료 모음' />
      <div className='content'>
        <LinkInput addLink={addLink} />
        <LinkList links={links} onClose={removeLink} />
      </div>
    </LinkManagerStyle>
  );
}

export default LinkManager;

const LinkManagerStyle = styled.div`
  padding-top: 28px;
  .content {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    padding: 40px 0;
    gap: 40px;
    flex: 1;

    @media (max-width: 730px) {
      grid-template-columns: 1fr;
    }
  }
`;
