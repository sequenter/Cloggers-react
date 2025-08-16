import { createContext, useContext } from 'react';

import type { RecentItemDetail } from '@types';

interface Recent {
  recentItems: Array<RecentItemDetail>;
  error: Error | undefined;
  isLoading: boolean;
}

export const RecentContext = createContext<Recent>({ recentItems: [], error: undefined, isLoading: false });

export const useRecent = () => useContext(RecentContext);
