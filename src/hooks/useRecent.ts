import type { RecentItemDetail } from '@types';

import { createContext, useContext } from 'react';

interface Recent {
  recentItems: Array<RecentItemDetail>;
  error: Error | undefined;
  isLoading: boolean;
}

export const RecentContext = createContext<Recent>({ recentItems: [], error: undefined, isLoading: false });

export const useRecent = () => useContext(RecentContext);
