import { create } from "zustand";

interface ProfileModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProfileModal = create<ProfileModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfileModal;
