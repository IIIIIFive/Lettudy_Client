export interface Note {
  noteId: string;
  roomId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}
export interface CreateNoteReq {
  title: string;
  content: string;
  images: string[];
  tags: string[];
}

export interface CreatePreSignedReq {
  fileName: string;
}

export interface UpdateNoteReq {
  roomId: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
}

export interface NoteContentRes {
  message: string;
  content: string;
  images: string[];
}

export interface NoteRes {
  message: string;
  notes?: Note[];
}

export interface DeleteNoteReq {
  roomId: string;
  noteId: string;
}

export interface PreSignedUrlRes {
  message: string;
  preSignedUrl: string;
  fileName: string;
}

export interface TagsRes {
  message: string;
  tags: string[];
}
