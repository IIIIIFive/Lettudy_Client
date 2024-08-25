import { create } from 'zustand';

type ModalType = 'create' | 'join' | 'drawing' | 'info' | null;

interface ModalStore {
  modalType: ModalType;
  isOpen: boolean;
  openModal: (type: ModalType, date?: Date) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  isOpen: false,
  selectedDate: null,
  events: [],
  openModal: (type) => set({ modalType: type, isOpen: true }),
  closeModal: () => set({ modalType: null, isOpen: false }),
}));

export default useModalStore;
