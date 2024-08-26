import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '@/components/common/BackButton';
import NoteForm from '@/components/note/NoteForm';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getNoteContent, getNotes, updateNote } from '@/api/note.api';

function EditNote() {
  const { roomId, noteId } = useParams<{ roomId: string; noteId: string }>();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState<{
    title: string;
    tags: string[];
    content: string;
    date: string;
    images: string[];
  } | null>(null);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      if (roomId && noteId) {
        try {
          const notesResponse = await getNotes(roomId);

          if (notesResponse && notesResponse.notes) {
            const noteMetadata = notesResponse.notes.find(
              (note) => note.noteId === noteId,
            );

            if (noteMetadata) {
              const contentResponse = await getNoteContent(roomId, noteId);

              setNoteData({
                title: noteMetadata.title,
                tags: noteMetadata.tags,
                content: contentResponse.content,
                date: noteMetadata.createdAt,
                images: contentResponse.images,
              });
            }
          } else {
          }
        } catch (error) {
          console.error('노트 내용 조회 오류가 발생했습니다.');
        }
      }
    };

    fetchNoteDetails();
  }, [roomId, noteId]);

  const handleSubmit = async (data: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  }) => {
    if (roomId && noteId) {
      try {
        await updateNote(noteId, {
          roomId,
          title: data.title,
          content: data.content,
          images: noteData?.images || [],
          tags: data.tags,
        });
        navigate(`/room/${roomId}/notes`);
      } catch (error) {
        console.error('노트 수정 오류가 발생했습니다.');
      }
    }
  };
  if (!roomId) {
    return <div></div>;
  }

  return (
    <EditNoteStyle>
      <BackButton text='수정하기' />
      {noteData ? (
        <NoteForm initialData={noteData} onSubmit={handleSubmit} />
      ) : (
        <p></p>
      )}
    </EditNoteStyle>
  );
}

export default EditNote;

const EditNoteStyle = styled.div`
  margin: 0 auto;
  padding: 24px 0;
  position: relative;
`;
