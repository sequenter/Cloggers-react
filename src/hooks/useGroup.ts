import type { PlayerDetail } from '@types';

import { createContext, useContext } from 'react';

interface Group {
  playerRecord: Record<string, PlayerDetail>;
  players: Array<PlayerDetail>;
  error: Error | undefined;
  isLoading: boolean;
}

export const GroupContext = createContext<Group>({ playerRecord: {}, players: [], error: undefined, isLoading: false });

export const useGroup = () => useContext(GroupContext);
