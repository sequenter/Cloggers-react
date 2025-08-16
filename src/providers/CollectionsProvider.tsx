import { type ReactNode, useEffect, useMemo } from 'react';

import { CollectionsContext } from '@hooks/useCollections';
import { useFetch } from '@hooks/useFetch';
import { useSearch } from '@hooks/useSearch';

import type { FetchGroupCollections, ItemDetail } from '@types';

interface Props {
  children: ReactNode;
}

export const CollectionsProvider = ({ children }: Props) => {
  const { groupId, selectedPlayers } = useSearch();
  const { data, error, isLoading, fetchData } = useFetch<FetchGroupCollections>('collection-log/group_collection_log');

  const playersWithCollections = useMemo(
    /**
     * Provides an array containing players within the group collections.
     * @returns {Record<string, Array<string>>} Player array
     */
    (): Record<string, Array<string>> => {
      return data
        ? data.members.reduce(
            (acc, { items, player_name_with_capitalization }) => ({ ...acc, [player_name_with_capitalization]: items }),
            {}
          )
        : {};
    },
    [data]
  );

  const collectedItems = useMemo(
    /**
     * Creates an array of items containing arrays of players that have and haven't collected the item.
     * @returns {Array<ItemDetail>} Collected item map
     */
    (): Array<ItemDetail> => {
      if (data) {
        const itemRecord: Record<string, Array<string>> = {};

        // Create a map of items and the players that have collected them
        for (const { items, player_name_with_capitalization } of data.members) {
          // Filter by selected members
          if (!selectedPlayers.length || selectedPlayers.includes(player_name_with_capitalization)) {
            for (const item of items) {
              if (itemRecord[item]) {
                itemRecord[item].push(player_name_with_capitalization);
              } else {
                itemRecord[item] = [player_name_with_capitalization];
              }
            }
          }
        }

        // Get players who haven't collected the item
        return Object.entries(itemRecord).map(([item, playersCollected]) => ({
          item,
          playersCollected,
          playersNotCollected: Object.keys(playersWithCollections).filter((player) => !playersCollected.includes(player))
        }));
      }

      return [];
    },
    [data, playersWithCollections, selectedPlayers]
  );

  // Effect to fetch data based on the group id
  useEffect(() => {
    if (groupId) {
      fetchData({ group: groupId, categories: 'all' });
    }
  }, [groupId, fetchData]);

  return (
    <CollectionsContext.Provider value={{ collectedItems, playersWithCollections, data, error, isLoading }}>
      {children}
    </CollectionsContext.Provider>
  );
};
