import { FeaturedItems } from '@components';

import { useCollections } from '@hooks/useCollections';

import { useMemo } from 'react';

const MAX_FEATURED_ITEMS = 50;

const Featured = () => {
  const { collectedItems } = useCollections();

  const sortedCollectedItems = useMemo(
    /**
     * Sort collected items first by the amount of players collected, and then by item name.
     */
    () => collectedItems.sort((a, b) => b.playersCollected.length - a.playersCollected.length || a.name.localeCompare(b.name)),
    [collectedItems]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FeaturedItems
        title="most collected items"
        items={sortedCollectedItems.slice(0, MAX_FEATURED_ITEMS)}
      />

      <FeaturedItems
        title="least collected items"
        items={sortedCollectedItems.slice(sortedCollectedItems.length - MAX_FEATURED_ITEMS)}
      />
    </div>
  );
};

export default Featured;
