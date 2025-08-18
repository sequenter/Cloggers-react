import { useCollections } from '@hooks/useCollections';
import { useFetch } from '@hooks/useFetch';
import { GroupContext } from '@hooks/useGroup';
import { useSearch } from '@hooks/useSearch';

import type { FetchGroupMemberStats, PlayerDetail } from '@types';

import { isObjectEmpty } from '@utils/common';

import { type ReactNode, useEffect, useMemo } from 'react';

interface Props {
  children: ReactNode;
}

export const GroupProvider = ({ children }: Props) => {
  const { groupId } = useSearch();
  const { collectedItems, playersWithCollections } = useCollections();
  const { data, error, isLoading, fetchData } = useFetch<FetchGroupMemberStats>('group_member_info');

  const players = useMemo(
    /**
     * Creates an array of player details.
     */
    () => {
      if (data && !isObjectEmpty(collectedItems)) {
        // Get collections that have only been collected by a single player
        const collectedUniqueItems = Object.values(collectedItems).filter(({ playersCollected }) => playersCollected.length === 1);
        const playerRecord: Record<string, PlayerDetail> = {};

        for (const key in data.memberlist) {
          const { player, player_name_with_capitalization, game_mode } = data.memberlist[key];

          const playerName = player_name_with_capitalization ?? player;
          const playerCollections = playersWithCollections[playerName];
          const isSynced = !!playerCollections;

          playerRecord[playerName] = {
            name: playerName,
            gameMode: game_mode,
            totalItemsCollected: isSynced ? playerCollections.length : 0,
            uniques: isSynced ? collectedUniqueItems.filter(({ playersCollected }) => playersCollected.includes(playerName)) : [],
            isSynced
          };
        }

        return playerRecord;
      }

      return {};
    },
    [collectedItems, data, playersWithCollections]
  );

  // Effect to fetch data based on the group id
  useEffect(() => {
    if (groupId) {
      fetchData({ id: groupId });
    }
  }, [groupId, fetchData]);

  return <GroupContext.Provider value={{ players, error, isLoading }}>{children}</GroupContext.Provider>;
};
