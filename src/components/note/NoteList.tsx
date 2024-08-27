import { Note } from '@/model/note.model';
import styled from 'styled-components';
import NoteEmpty from './NoteEmpty';

type NoteListProps = {
  notes: Note[];
  onNoteClick: (note: Note) => void;
};

const NoteList = ({ notes, onNoteClick }: NoteListProps) => {
  return (
    <NoteListStyle>
      <div className='title'>
        <img src='/assets/images/dot.png' alt='dot' width={20} />
        <h4>노트목록</h4>
      </div>
      {notes.length === 0 ? (
        <NoteEmpty />
      ) : (
        notes.map((note) => (
          <div key={note.noteId} className='note-item'>
            <div
              className='note-title-container'
              onClick={() => onNoteClick(note)}>
              <img src='/assets/images/book.png' alt='book' width={20} />
              <h5>{note.title}</h5>
            </div>
            <div className='note-tags'>
              {note.tags.map((tag, idx) => (
                <span key={idx} className='note-tag'>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </NoteListStyle>
  );
};

export default NoteList;

const NoteListStyle = styled.div`
  .title {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    h4 {
      color: ${({ theme }) => theme.color_textBlack};
    }
  }
  .note-item {
    margin-bottom: 23px;

    .note-title-container {
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;
    }

    .note-tags {
      margin-top: 5px;
      margin-left: 28px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .note-tag {
        display: inline-block;
        font-size: ${({ theme }) => theme.fontSize_xxs};
        font-weight: bold;
        color: ${({ theme }) => theme.color_keyBlue};
        padding: 4px 5px;
        border-radius: 5px;
      }
    }
  }
`;
