import { create } from 'zustand';
import { ModalStore } from '../types';

export const useRentModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

