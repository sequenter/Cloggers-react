import type { FetchGroupCollections, ItemDetail } from '@types';

import { createContext, useContext } from 'react';

interface Collections {
  collectedItems: Record<string, ItemDetail>;
  playersWithCollections: Record<string, Array<string>>;
  data: FetchGroupCollections | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export const CollectionsContext = createContext<Collections>({
  collectedItems: {},
  playersWithCollections: {},
  data: undefined,
  error: undefined,
  isLoading: false
});

export const useCollections = () => useContext(CollectionsContext);
