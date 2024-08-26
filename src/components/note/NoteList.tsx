import { Note } from '@/model/note.model';
import styled from 'styled-components';

type NoteListProps = {
  notes: Note[];
  onNoteClick: (note: Note) => void;
};

const NoteList = ({ notes, onNoteClick }: NoteListProps) => {
  return (
    <NoteListStyle>
      {notes.map((note) => (
        <div key={note.noteId} className='note-item'>
          <div
            className='note-title-container'
            onClick={() => onNoteClick(note)}>
            <img src='/assets/images/book.png' alt='book' width={20} />
            <h4>{note.title}</h4>
          </div>
          <div className='note-tags'>
            {note.tags.map((tag, idx) => (
              <span key={idx} className='note-tag'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </NoteListStyle>
  );
};

export default NoteList;

const NoteListStyle = styled.div`
  .note-item {
    margin-bottom: 20px;

    .note-title-container {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .note-tags {
      margin-top: 16px;
      margin-left: 28px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .note-tag {
        display: inline-block;
        font-size: ${({ theme }) => theme.fontSize_xxs};
        font-weight: bold;
        color: ${({ theme }) => theme.color_keyBlue};
        background-color: ${({ theme }) => theme.color_bgBlue};
        padding: 6px 14px;
        border-radius: 5px;
      }
    }
  }
`;
