import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TagList from '@/components/note/TagList';
import NoteList from '@/components/note/NoteList';
import Pagination from '@/components/note/Pagination';
import NoteDetail from '@/components/note/NoteDetail';
import BackButton from '@/components/common/BackButton';
import styled from 'styled-components';
import { getNotes, getTags } from '@/api/note.api';
import { Note } from '@/model/note.model';

function NoteView() {
  const { roomId } = useParams<{ roomId: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNotesAndTags = async () => {
      try {
        if (roomId) {
          const notesResponse = await getNotes(roomId);
          setNotes(notesResponse.notes || []);

          const tagsResponse = await getTags(roomId);
          setTags(tagsResponse.tags || []);

          if (notesResponse.notes && notesResponse.notes.length > 0) {
            setSelectedNote(notesResponse.notes[0]);
          }
        }
      } catch (error) {
        console.error('노트 목록 및 태그 조회 오류가 발생했습니다.');
      }
    };

    fetchNotesAndTags();
  }, [roomId]);

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

  const handleResetTags = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const filteredNotes = selectedTags.length
    ? notes.filter((note) =>
        selectedTags.some((tag) => note.tags.includes(tag)),
      )
    : notes;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

  const handleDeleteNote = (noteId: string) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.noteId !== noteId);

      const remainingTags = new Set<string>();
      updatedNotes.forEach((note) =>
        note.tags.forEach((tag) => remainingTags.add(tag)),
      );
      setTags(Array.from(remainingTags));

      if (selectedNote?.noteId === noteId) {
        const newSelectedNote = updatedNotes[0] || null;
        setSelectedNote(newSelectedNote);
      }
      return updatedNotes;
    });
  };

  return (
    <NoteViewStyle showAllTags={showAllTags}>
      <BackButton text='노트보기' />
      <div className='container'>
        <div className='list'>
          <TagList
            allTags={tags}
            selectedTags={selectedTags}
            onToggle={handleToggleTags}
            onTagClick={handleTagClick}
            onReset={handleResetTags}
            showAllTags={showAllTags}
          />
          <NoteList notes={currentNotes} onNoteClick={handleNoteClick} />
          <div className='pagination'>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <div className='note'>
          <NoteDetail note={selectedNote} onDelete={handleDeleteNote} />
        </div>
      </div>
    </NoteViewStyle>
  );
}

export default NoteView;

const NoteViewStyle = styled.div<{ showAllTags: boolean }>`
  max-height: 100vh;
  padding: 24px 0;

  .container {
    display: flex;
    gap: 50px;
    padding: 40px 0;
    position: relative;

    .list {
      flex-basis: 400px;
      height: 67vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 15px;
      position: sticky;
      top: 24px;
      align-self: start;

      .pagination {
        margin-top: auto;
      }
    }

    .note {
      min-width: 600px;
    }
  }
`;
