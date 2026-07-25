import { PopupsEngineProvider, PopupsEngineRoot } from '@idem.agency/popups-engine';

import { popupsRegistry } from '@/widgets/popups/registry';
import { PopupsWrapper } from './wrapper';

export const PopupsProvider: FCClass = ({ children }) => {
  return (
    <PopupsEngineProvider
      popups={popupsRegistry}
    >
      {children}

      <PopupsEngineRoot
        components={{ wrapper: PopupsWrapper }}
      />
    </PopupsEngineProvider>
  );
};
