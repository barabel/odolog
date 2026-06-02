import { ListPage } from '@/pages/list';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ROUTES } from '@/shared/config/routes';
import { LayoutIndex } from './layouts/index';
import { AnalyticsPage } from '@/pages/analytics';
import { SettingsPage } from '@/pages/settings';
import { db } from '@/shared/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useActiveVehicleStore } from '@/entities/vehicle';

const VehicleRedirect: FCClass = () => {
  const vehicles = useLiveQuery(() => {
    return db.vehicles.toArray();
  });
  const activeVehicleId = useActiveVehicleStore((state) => {
    return state.activeVehicleId;
  });

  if (!vehicles?.length) {
    return null;
  }

  const exists = vehicles.some((vehicle) => {
    return vehicle.id === activeVehicleId;
  });
  const targetId = exists ? activeVehicleId! : vehicles[0].id;

  return (
    <Navigate
      to={ROUTES.list(targetId)}
      replace
    />
  );
};

const App: FCClass = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<LayoutIndex />}
        >
          <Route
            path={ROUTES.patterns.vehicle}
          >
            <Route
              index
              element={<ListPage />}
            />

            <Route
              path={ROUTES.patterns.analytics}
              element={<AnalyticsPage />}
            />
          </Route>

          <Route
            path={ROUTES.patterns.settings}
            element={<SettingsPage />}
          />
        </Route>

        <Route
          path="/"
          element={<VehicleRedirect />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
