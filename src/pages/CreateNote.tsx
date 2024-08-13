import BackButton from '@/components/common/BackButton';
import NoteForm from '@/components/note/NoteForm';
import useNoteStore from '@/store/noteStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CreateNote() {
  const navigate = useNavigate();
  const { addNote } = useNoteStore();

  const handleSubmit = (data: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  }) => {
    addNote(data);
    console.log('새노트:', data);
    navigate('/note');
  };

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
