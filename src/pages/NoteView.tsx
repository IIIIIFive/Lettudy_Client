import { useNoteView } from '@/hooks/useNoteView';
import styled from 'styled-components';
import TagList from '@/components/note/TagList';
import NoteList from '@/components/note/NoteList';
import Pagination from '@/components/note/Pagination';
import NoteDetail from '@/components/note/NoteDetail';
import BackButton from '@/components/common/BackButton';

function NoteView() {
  const {
    selectedNote,
    showAllTags,
    selectedTags,
    allTags,
    currentNotes,
    currentPage,
    totalPages,
    handleNoteClick,
    handleToggleTags,
    handleTagClick,
    handleResetTags,
    setCurrentPage,
  } = useNoteView();

  return (
    <NoteViewStyle showAllTags={showAllTags}>
      <BackButton text='노트보기' />
      <div className='container'>
        <div className='list'>
          <TagList
            allTags={allTags}
            selectedTags={selectedTags}
            onToggle={handleToggleTags}
            onTagClick={handleTagClick}
            onReset={handleResetTags}
            showAllTags={showAllTags}
          />
          <NoteList notes={currentNotes} onNoteClick={handleNoteClick} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className='note'>
          <NoteDetail note={selectedNote} />
        </div>
      </div>
    </NoteViewStyle>
  );
}

export default NoteView;

const NoteViewStyle = styled.div<{ showAllTags: boolean }>`
  padding: 24px 0;

  .container {
    gap: 50px;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    padding: 40px 0;
    position: relative;

    .list {
      padding-right: 15px;
      position: sticky;
      top: 24px;
      align-self: start;
    }
  }
`;
