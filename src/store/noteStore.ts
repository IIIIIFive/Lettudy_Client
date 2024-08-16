import { create } from 'zustand';

interface Note {
  title: string;
  tags: string[];
  content: string;
  date: string;
}

interface NoteState {
  notes: Note[];
  selectedNote: Note | null;
  selectedTags: string[];
  showAllTags: boolean;
  currentPage: number;
  itemsPerPage: number;
  setSelectedNote: (note: Note) => void;
  toggleShowAllTags: () => void;
  selectTag: (tag: string) => void;
  resetTags: () => void;
  setCurrentPage: (page: number) => void;
}

const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  selectedNote: null,
  selectedTags: [],
  showAllTags: false,
  currentPage: 1,
  itemsPerPage: 5,
  setSelectedNote: (note) => set({ selectedNote: note }),
  toggleShowAllTags: () =>
    set((state) => ({ showAllTags: !state.showAllTags })),
  selectTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
      currentPage: 1,
    })),
  resetTags: () => set({ selectedTags: [], currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useNoteStore;
