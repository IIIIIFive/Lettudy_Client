import { Note } from '@/data/noteData';
import styled from 'styled-components';
import { formatDate } from '@/utils/formatDate';

type NoteDetailProps = {
  note: Note | null;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  if (!note) return <p>노트를 선택해주세요.</p>;

  return (
    <NoteDetailStyle>
      <div className='note-header'>
        <h4 className='note-title'>{note.title}</h4>
        <div className='note-tags'>
          {note.tags.map((tag, idx) => (
            <span key={idx} className='note-tag'>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <hr />
      <div className='note-actions'>
        <span className='note-action'>수정</span>
        <span className='note-action'>삭제</span>
      </div>
      <div
        className='note-content'
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      <div className='note-date'>작성일 {formatDate(note.date)}</div>
    </NoteDetailStyle>
  );
};

export default NoteDetail;

const NoteDetailStyle = styled.div`
  background-color: ${({ theme }) => theme.color_bgWhite};
  border: 1px solid ${({ theme }) => theme.color_borderGray};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  min-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .note-header {
    padding: 8px;
    display: flex;
    justify-content: space-between;

    .note-title {
      margin-top: 2px;
      font-size: ${({ theme }) => theme.fontSize_lg};
      color: ${({ theme }) => theme.color_textKey};
    }

    .note-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .note-tag {
        background-color: ${({ theme }) => theme.color_bgBlue};
        font-size: ${({ theme }) => theme.fontSize_xxs};
        font-weight: bold;
        color: ${({ theme }) => theme.color_keyBlue};
        padding: 6px 14px;
        border-radius: 5px;
      }
    }
  }

  hr {
    margin: 10px 0;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.color_borderGray};
  }

  .note-actions {
    display: flex;
    justify-content: flex-end;
    margin-right: 12px;
    gap: 14px;

    .note-action {
      cursor: pointer;
      color: ${({ theme }) => theme.color_textGray};
      font-size: ${({ theme }) => theme.fontSize_xxs};

      &:hover {
        color: ${({ theme }) => theme.color_textKey};
      }
    }
  }

  .note-content {
    padding: 10px;
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSize_sm};
    color: ${({ theme }) => theme.color_textBlack};
  }

  .note-date {
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize_xxs};
    color: ${({ theme }) => theme.color_textGray};
    margin-top: auto;
  }
`;
