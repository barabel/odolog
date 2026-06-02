import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TActiveVehicleState = {
  activeVehicleId: string | null;
  setActiveVehicleId: (id: string) => void;
};

export const useActiveVehicleStore = create<TActiveVehicleState>()(
  persist(
    set => ({
      activeVehicleId: null,
      setActiveVehicleId: (id) => {
        set({ activeVehicleId: id });
      },
    }),
    {
      name: 'odolog:active-vehicle',
    },
  ),
);
