import { createContext, useContext } from 'react';

import type { FetchGroupCollections, ItemDetail, SubCategories } from '@types';

interface Collections {
  collectedItems: Array<ItemDetail>;
  collectedItemsByCategory: Partial<Record<SubCategories, Record<string, ItemDetail>>>;
  playersWithCollections: Record<string, Array<string>>;
  data: FetchGroupCollections | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export const CollectionsContext = createContext<Collections>({
  collectedItems: [],
  collectedItemsByCategory: {},
  playersWithCollections: {},
  data: undefined,
  error: undefined,
  isLoading: false
});

export const useCollections = () => useContext(CollectionsContext);
