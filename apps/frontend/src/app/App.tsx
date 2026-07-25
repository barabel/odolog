import { ListPage } from '@/pages/list';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '@/shared/config/routes';
import { LayoutIndex } from './layouts/index';
import { AnalyticsPage } from '@/pages/analytics';
import { SettingsPage } from '@/pages/settings';
import { VehicleRedirect } from '@/entities/vehicle';
import { BottomSheetStack } from '@/shared/lib/bottom-sheet';
import { sheetRegistry } from '@/widgets/popups/registry';
import { PopupsProvider } from './providers/popups';

const App: FCClass = () => {
  return (
    <BrowserRouter>
      <BottomSheetStack
        registry={sheetRegistry}
      />

      <PopupsProvider>
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
      </PopupsProvider>
    </BrowserRouter>
  );
};

export default App;
