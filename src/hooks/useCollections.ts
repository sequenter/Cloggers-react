import { createContext, useContext } from 'react';

import type { FetchGroupCollections, ItemDetail } from '@types';

interface Collections {
  collectedItems: Array<ItemDetail>;
  playersWithCollections: Array<string>;
  data: FetchGroupCollections | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export const CollectionsContext = createContext<Collections>({
  collectedItems: [],
  playersWithCollections: [],
  data: undefined,
  error: undefined,
  isLoading: false
});

export const useCollections = () => useContext(CollectionsContext);
