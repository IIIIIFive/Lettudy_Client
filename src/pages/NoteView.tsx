import { Note, notes } from '@/data/noteData';
import { useState } from 'react';
import styled from 'styled-components';
import TagList from '@/components/note/TagList';
import NoteList from '@/components/note/NoteList';
import Pagination from '@/components/note/Pagination';
import NoteDetail from '@/components/note/NoteDetail';
import BackButton from '@/components/common/BackButton';

const sortedNotes: Note[] = [...notes].sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);

const allTags = Array.from(new Set(sortedNotes.flatMap((note) => note.tags)));

function NoteView() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(sortedNotes[0]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleToggleTags = () => {
    setShowAllTags(!showAllTags);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
    setCurrentPage(1);
  };

  const filteredNotes = selectedTags.length
    ? sortedNotes.filter((note) =>
        selectedTags.some((tag) => note.tags.includes(tag)),
      )
    : sortedNotes;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

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

export default NoteView;
