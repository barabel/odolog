import { ListPage } from '@/pages/list';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '@/shared/config/routes';
import { LayoutIndex } from './layouts/index';
import { AnalyticsPage } from '@/pages/analytics';
import { SettingsPage } from '@/pages/settings';
import { VehicleRedirect } from '@/entities/vehicle';
import { DrawerProvider } from '@/shared/lib/drawer';
import { registry } from '@/widgets/drawers';

const App: FCClass = () => {
  return (
    <BrowserRouter>
      <DrawerProvider
        registry={registry}
      >
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
      </DrawerProvider>
    </BrowserRouter>
  );
};

export default App;
