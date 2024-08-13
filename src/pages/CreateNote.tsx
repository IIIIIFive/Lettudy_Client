import BackButton from '@/components/common/BackButton';
import NoteForm from '@/components/note/NoteForm';
import styled from 'styled-components';

function CreateNote() {
  const handleSubmit = (data: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  }) => {
    console.log('Note submitted:', data);
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
