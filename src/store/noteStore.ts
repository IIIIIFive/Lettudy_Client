import { create } from 'zustand';

interface Note {
  title: string;
  tags: string[];
  content: string;
  date: string;
}

interface NoteState {
  title: string;
  tags: string;
  tagList: string[];
  content: string;
  showToast: boolean;
  date: string;
  notes: Note[];
  setTitle: (title: string) => void;
  setTags: (tags: string) => void;
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
  setContent: (content: string) => void;
  setShowToast: (showToast: boolean) => void;
  setDate: (date: string) => void;
  addNote: (note: Note) => void;
  clearTags: () => void;
}

const useNoteStore = create<NoteState>((set) => ({
  title: '',
  tags: '',
  tagList: [],
  content: '',
  showToast: false,
  date: '',
  notes: [],
  setTitle: (title) => set({ title }),
  setTags: (tags) => set({ tags }),
  addTag: (tag) =>
    set((state) => ({
      tagList: [...state.tagList, tag],
      tags: '',
    })),
  removeTag: (index) =>
    set((state) => ({
      tagList: state.tagList.filter((_, i) => i !== index),
    })),
  setContent: (content) => set({ content }),
  setShowToast: (showToast) => set({ showToast }),
  setDate: (date) => set({ date }),
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),
  clearTags: () => set({ tagList: [] }),
}));

export default useNoteStore;
