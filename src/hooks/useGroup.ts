import type { PlayerDetail } from '@types';

import { createContext, useContext } from 'react';

interface Group {
  players: Record<string, PlayerDetail>;
  error: Error | undefined;
  isLoading: boolean;
}

export const GroupContext = createContext<Group>({ players: {}, error: undefined, isLoading: false });

export const useGroup = () => useContext(GroupContext);
