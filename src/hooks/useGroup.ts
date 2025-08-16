import { createContext, useContext } from 'react';

import type { PlayerDetail } from '@types';

interface Group {
  playerRecords: Record<string, PlayerDetail>;
  error: Error | undefined;
  isLoading: boolean;
}

export const GroupContext = createContext<Group>({ playerRecords: {}, error: undefined, isLoading: false });

export const useGroup = () => useContext(GroupContext);
