import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import { CollectionsProvider } from '@providers/CollectionsProvider';
import { DialogProvider } from '@providers/DialogProvider.tsx';
import { GroupProvider } from '@providers/GroupProvider.tsx';
import { RecentProvider } from '@providers/RecentProvider.tsx';
import { SearchProvider } from '@providers/SearchProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <CollectionsProvider>
        <RecentProvider>
          <GroupProvider>
            <DialogProvider>
              <App />
            </DialogProvider>
          </GroupProvider>
        </RecentProvider>
      </CollectionsProvider>
    </SearchProvider>
  </StrictMode>
);
