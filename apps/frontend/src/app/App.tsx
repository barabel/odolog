import { ListPage } from '@/pages/list';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES_PATHS } from '@/shared/config/routes';
import { LayoutIndex } from './layouts/index';
import { AnalyticsPage } from '@/pages/analytics';
import { SettingsPage } from '@/pages/settings';

const App: FCClass = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_PATHS.LIST} element={<LayoutIndex />}>
          <Route index element={<ListPage />} />

          <Route path={ROUTES_PATHS.ANALYTICS} element={<AnalyticsPage />} />

          <Route path={ROUTES_PATHS.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
