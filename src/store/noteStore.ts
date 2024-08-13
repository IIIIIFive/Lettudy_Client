import { create } from 'zustand';

interface NoteState {
  title: string;
  tags: string;
  tagList: string[];
  content: string;
  showToast: boolean;
  date: string;
  setTitle: (title: string) => void;
  setTags: (tags: string) => void;
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
  setContent: (content: string) => void;
  setShowToast: (showToast: boolean) => void;
  setDate: (date: string) => void;
}

const useNoteStore = create<NoteState>((set) => ({
  title: '',
  tags: '',
  tagList: [],
  content: '',
  showToast: false,
  date: '',
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
}));

export default useNoteStore;
