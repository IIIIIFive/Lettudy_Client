import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Note, NoteContentRes } from '@/model/note.model';
import { deleteNote, getNoteContent } from '@/api/note.api';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

type NoteDetailProps = {
  note: Note | null;
  onDelete: (noteId: string) => void;
};

const NoteDetail = ({ note, onDelete }: NoteDetailProps) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoteContent = async () => {
      if (note?.noteId && roomId) {
        try {
          const response: NoteContentRes = await getNoteContent(
            roomId,
            note.noteId,
          );
          setContent(response.content);
        } catch (error) {
          console.error('콘텐츠를 가져오는 중 오류가 발생했습니다:', error);
        }
      }
    };

    fetchNoteContent();
  }, [note?.noteId, roomId]);

  const handleDelete = async () => {
    if (!roomId || !note || !note.noteId) return;

    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }
    try {
      await deleteNote({ roomId, noteId: note.noteId });
      onDelete(note.noteId);
    } catch (error) {
      console.error('노트 삭제 오류가 발생했습니다:', error);
    }
  };

  const handleEdit = () => {
    if (note && roomId) {
      navigate(`/room/${roomId}/edit-note/${note.noteId}`);
    }
  };

  if (!note) return <NoteDetailStyle className='empty-note'></NoteDetailStyle>;

  return (
    <NoteDetailStyle>
      <div className='note-header'>
        <h2>{note.title}</h2>
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
        <span className='note-action' onClick={handleEdit}>
          수정
        </span>
        <span className='note-action' onClick={handleDelete}>
          삭제
        </span>
      </div>
      <div
        className='note-content'
        dangerouslySetInnerHTML={{ __html: content || note.content }}
      />
      <div className='note-date'>작성일: {formatDate(note.createdAt)}</div>
    </NoteDetailStyle>
  );
};

export default NoteDetail;

const NoteDetailStyle = styled.div`
  width: 700px;
  background-color: ${({ theme }) => theme.color_bgWhite};
  border: 1px solid ${({ theme }) => theme.color_borderGray};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  min-height: 67vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .note-header {
    padding: 8px;
    display: flex;
    justify-content: space-between;

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
      font-size: ${({ theme }) => theme.fontSize_xs};

      &:hover {
        color: ${({ theme }) => theme.color_textKey};
      }
    }
  }
  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-left {
    text-align: left;
  }

  .note-content {
    padding: 10px;
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSize_sm};
    color: ${({ theme }) => theme.color_textBlack};
    line-height: 1.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }

    ul {
      list-style-type: disc;
      padding-left: 20px;
      padding-top: 20px;
    }

    ol {
      list-style-type: decimal;
      padding-left: 20px;
    }

    img {
      max-width: 100%;
      height: auto;
      pointer-events: none;
    }
  }

  .note-date {
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize_xxs};
    color: ${({ theme }) => theme.color_textGray};
    margin-top: auto;
  }
`;
