// use-login.dialog.ts
import { create } from 'zustand';

interface LoginDialogStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Should be named export, not default
export const useLoginDialog = create<LoginDialogStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));