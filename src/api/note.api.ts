import { httpClient } from '@/api/http';
import {
  CreateNoteReq,
  DeleteNoteReq,
  NoteContentRes,
  NoteRes,
  TagsRes,
  UpdateNoteReq,
} from '@/model/note.model';

export const createNote = async (
  roomId: string,
  requestPayload: CreateNoteReq,
) => {
  try {
    const response = await httpClient.post(`/notes/${roomId}`, {
      roomId,
      ...requestPayload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotes = async (roomId: string): Promise<NoteRes> => {
  try {
    const response = await httpClient.get(`/notes/${roomId}`, {
      params: { roomId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNoteContent = async (
  roomId: string,
  noteId: string,
): Promise<NoteContentRes> => {
  try {
    const response = await httpClient.get(`/notes/${roomId}/${noteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (
  noteId: string,
  requestPayload: UpdateNoteReq,
) => {
  try {
    const response = await httpClient.put(`/notes/${noteId}`, requestPayload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async ({ roomId, noteId }: DeleteNoteReq) => {
  try {
    const response = await httpClient.delete(`/notes/${roomId}/${noteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPreSignedUrl = async (roomId: string, fileName: string) => {
  try {
    const response = await httpClient.post(`/notes/${roomId}/presigned`, {
      fileName,
    });
    console.log('Pre-signed URL:', response.data);
    return response.data;
  } catch (error) {
    console.error('Pre-signed URL 발급 오류가 발생했습니다.');
  }
};

export const uploadImageToS3 = async (preSignedUrl: string, file: File) => {
  try {
    const response = await fetch(preSignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    if (!response.ok) {
      throw new Error('이미지 업로드 실패');
    }
  } catch (error) {
    console.error('이미지 업로드 오류가 발생했습니다.');
  }
};

export const getTags = async (roomId: string): Promise<TagsRes> => {
  try {
    const response = await httpClient.get(`/tags/${roomId}`, {
      params: { roomId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
