import { create } from 'zustand';

interface RegisterDialogStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterDialog = create<RegisterDialogStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));