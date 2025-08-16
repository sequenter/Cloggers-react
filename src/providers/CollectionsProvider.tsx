import { type ReactNode, useEffect, useMemo } from 'react';

import { CollectionsContext } from '@hooks/useCollections';
import { useFetch } from '@hooks/useFetch';
import { useSearch } from '@hooks/useSearch';

import type { FetchGroupCollections, ItemDetail, SubCategories } from '@types';

import { ITEMS } from '@utils/constants';

interface Props {
  children: ReactNode;
}

export const CollectionsProvider = ({ children }: Props) => {
  const { groupId, selectedPlayers } = useSearch();
  const { data, error, isLoading, fetchData } = useFetch<FetchGroupCollections>('collection-log/group_collection_log');

  const playersWithCollections = useMemo(
    /**
     * Creates a record containing item collections indexed by player name.
     */
    () => {
      if (data) {
        const record: Record<string, Array<string>> = {};

        for (const { items, player_name_with_capitalization } of data.members) {
          record[player_name_with_capitalization] = items.map(String);
        }

        return record;
      }

      return {};
    },
    [data]
  );

  const collectedItems = useMemo(
    /**
     * Creates an array of collected items. Initially maps to an object to obtain all players who have collected an item, allowing to obtain
     * the inverse of players who haven't collected the item.
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

        return Object.entries(itemRecord).map(([item, playersCollected]) => ({
          item,
          name: ITEMS[item].name,
          categories: ITEMS[item].categories,
          playersCollected,
          playersNotCollected: Object.keys(playersWithCollections).filter(
            (player) => (!selectedPlayers.length || selectedPlayers.includes(player)) && !playersCollected.includes(player)
          )
        }));
      }

      return [];
    },
    [data, playersWithCollections, selectedPlayers]
  );

  const collectedItemsByCategory = useMemo(
    /**
     * Creates a record containing collected items indexed by their corresponding sub category.  Maps to an object to allow the collection
     * log to easily access items within categories without array lookups.
     */
    () => {
      if (collectedItems.length) {
        const itemCategories: Partial<Record<SubCategories, Record<string, ItemDetail>>> = {};

        for (const collectedItem of collectedItems) {
          for (const category of collectedItem.categories) {
            if (itemCategories[category]) {
              itemCategories[category][collectedItem.item] = collectedItem;
            } else {
              itemCategories[category] = { [collectedItem.item]: collectedItem };
            }
          }
        }

        return itemCategories;
      }

      return {};
    },
    [collectedItems]
  );

  // Effect to fetch data based on the group id
  useEffect(() => {
    if (groupId) {
      fetchData({ group: groupId, categories: 'all' });
    }
  }, [groupId, fetchData]);

  return (
    <CollectionsContext.Provider value={{ collectedItems, collectedItemsByCategory, playersWithCollections, data, error, isLoading }}>
      {children}
    </CollectionsContext.Provider>
  );
};
