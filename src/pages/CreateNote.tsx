import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '@/components/common/BackButton';
import NoteForm from '@/components/note/NoteForm';
import styled from 'styled-components';
import { createNote } from '@/api/note.api';

function CreateNote() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  }) => {
    if (!roomId) {
      return;
    }

    try {
      const newNote = {
        title: data.title,
        content: data.content,
        tags: data.tags,
        images: [],
      };

      await createNote(roomId, newNote);
      navigate(`/room/${roomId}/notes`, { replace: true });
    } catch (error) {
      console.error('노트 등록 오류가 발생했습니다:');
    }
  };

  if (!roomId) {
    return <div></div>;
  }

  return (
    <CreateNoteStyle>
      <BackButton text='기록하기' />
      <NoteForm onSubmit={handleSubmit} />
    </CreateNoteStyle>
  );
}

export default CreateNote;

const CreateNoteStyle = styled.div`
  margin: 0 auto;
  padding: 24px 0;
  position: relative;
`;
