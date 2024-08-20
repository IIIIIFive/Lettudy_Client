import styled from 'styled-components';
import LinkInput from '@/components/link/LinkInput';
import LinkList from '@/components/link/LinkList';
import BackButton from '@/components/common/BackButton';
import { useLink } from '@/hooks/useLinks';

function LinkManager() {
  const { addLink, removeLink, links } = useLink();

  return (
    <LinkManagerStyle>
      <BackButton text='자료 모음' />
      <div className='content'>
        <LinkInput addLink={addLink} />
        <LinkList links={links} onDelete={removeLink} />
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
