import { create } from 'zustand';
import { ModalStore } from '../types';

export const useLoginModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

