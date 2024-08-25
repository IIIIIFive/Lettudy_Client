import { Note } from '@/model/note.model';
import { create } from 'zustand';

interface NoteState {
  title: string;
  tags: string;
  tagList: string[];
  content: string;
  showToast: boolean;
  date: string;
  notes: Note[];
  currentPage: number;
  itemsPerPage: number;
  selectedTags: string[];
  setTitle: (title: string) => void;
  setTags: (tags: string) => void;
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
  setContent: (content: string) => void;
  setShowToast: (showToast: boolean) => void;
  setDate: (date: string) => void;
  addNote: (note: Note) => void;
  clearTags: () => void;
  setCurrentPage: (page: number) => void;
  setSelectedTags: (tags: string[]) => void;
  resetTags: () => void;
}

const useNoteStore = create<NoteState>((set) => ({
  title: '',
  tags: '',
  tagList: [],
  content: '',
  showToast: false,
  date: '',
  notes: [],
  currentPage: 1,
  itemsPerPage: 5,
  selectedTags: [],

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
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedTags: (tags) => set({ selectedTags: tags, currentPage: 1 }),
  resetTags: () => set({ selectedTags: [], currentPage: 1 }),
}));

export default useNoteStore;
