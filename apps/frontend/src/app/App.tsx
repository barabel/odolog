import { ListPage } from '@/pages/list';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ROUTES } from '@/shared/config/routes';
import { LayoutIndex } from './layouts/index';
import { AnalyticsPage } from '@/pages/analytics';
import { SettingsPage } from '@/pages/settings';
import { db } from '@/shared/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

const VehicleRedirect: FCClass = () => {
  const vehicles = useLiveQuery(() => {
    return db.vehicles.toArray();
  });

  if (!vehicles?.length) {
    return null;
  }

  return (
    <Navigate
      to={ROUTES.list(vehicles[0].id)}
      replace
    />
  );
};

const App: FCClass = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.patterns.vehicle}
          element={<LayoutIndex />}
        >
          <Route
            index
            element={<ListPage />}
          />

          <Route
            path={ROUTES.patterns.analytics}
            element={<AnalyticsPage />}
          />

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
