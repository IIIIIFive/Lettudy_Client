import { httpClient } from '@/api/http';
import {
  CreateNoteReq,
  DeleteNoteReq,
  NoteContentRes,
  NoteRes,
  PreSignedUrlRes,
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

export const createPreSignedUrl = async (
  roomId: string,
  fileName: string,
): Promise<PreSignedUrlRes> => {
  try {
    const response = await httpClient.post(`/notes/${roomId}/presigned`, {
      roomId,
      fileName,
    });
    return response.data;
  } catch (error) {
    throw error;
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
