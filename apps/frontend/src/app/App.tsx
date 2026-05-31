import { ListPage } from '@/pages/list';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES_PATHS } from '@/shared/config/routes';
import { LayoutIndex } from './layouts/index';

const App: FCClass = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_PATHS.LIST} element={<LayoutIndex />}>
          <Route index element={<ListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
