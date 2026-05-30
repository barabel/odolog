import { MainPage } from '@/pages/main';
import { HashRouter, Route, Routes } from 'react-router';
import { ROUTES_PATHS } from '@/shared/config/routes';

const App: FCClass = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES_PATHS.MAIN}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
