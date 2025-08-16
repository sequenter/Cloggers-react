import { createContext, useContext } from 'react';

import type { PlayerDetail } from '@types';

interface Group {
  players: Array<PlayerDetail>;
  error: Error | undefined;
  isLoading: boolean;
}

export const GroupContext = createContext<Group>({ players: [], error: undefined, isLoading: false });

export const useGroup = () => useContext(GroupContext);
