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
    <>
      <BackButton text='자료 모음' />
      <LinkManagerStyle>
        <LinkInput addLink={addLink} />
        <LinkList links={links} onClose={removeLink} />
      </LinkManagerStyle>
    </>
  );
}

export default LinkManager;

const LinkManagerStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 40px;
  padding: 42px 0;
  position: relative;
`;
