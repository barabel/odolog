import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TActiveVehicleState = {
  activeVehicleId: string | null;
  setActiveVehicleId: (id: string) => void;
};

/**
 * Хранит ID активного ТС, персистентно в localStorage.
 * Читается на страницах без vehicleId в URL (редирект с /, /settings).
 * Источник истины — URL; стор обновляется через useSyncVehicleIdFromUrl.
 */
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
