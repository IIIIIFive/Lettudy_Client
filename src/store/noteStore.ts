import { create } from 'zustand';

interface NoteStore {
  title: string;
  tags: string;
  tagList: string[];
  content: string;
  showToast: boolean;
  setTitle: (title: string) => void;
  setTags: (tags: string) => void;
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
  setContent: (content: string) => void;
  setShowToast: (show: boolean) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  title: '',
  tags: '',
  tagList: [],
  content: '',
  showToast: false,
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
  setShowToast: (show) => set({ showToast: show }),
}));

export default useNoteStore;
