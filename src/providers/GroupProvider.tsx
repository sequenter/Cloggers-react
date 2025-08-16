import { type ReactNode, useEffect, useMemo } from 'react';

import { useCollections } from '@hooks/useCollections';
import { useFetch } from '@hooks/useFetch';
import { GroupContext } from '@hooks/useGroup';
import { useSearch } from '@hooks/useSearch';

import type { FetchGroupMemberStats, PlayerDetail } from '@types';

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
     * @returns {Array<PlayerDetail>} Player details
     */
    (): Array<PlayerDetail> => {
      if (data && collectedItems.length > 0) {
        // Get collections that have only been collected by a single player
        const collectedUniqueItems = collectedItems.filter(({ playersCollected }) => playersCollected.length === 1);

        return Object.values(data.memberlist).map(({ player, player_name_with_capitalization, game_mode }) => {
          const playerName = player_name_with_capitalization ?? player;
          const playerCollection = playersWithCollections[playerName];
          const isSynced = !!playerCollection;

          return {
            name: playerName,
            gameMode: game_mode,
            totalItemsCollected: isSynced ? playerCollection.length : 0,
            uniques: isSynced ? collectedUniqueItems.filter(({ playersCollected }) => playersCollected.includes(playerName)) : [],
            isSynced
          };
        });
      }

      return [];
    },
    [collectedItems, data, playersWithCollections]
  );

  const playerRecord = useMemo(
    /**
     * Creates a record of player details indexed by player name.
     */
    () => {
      const record: Record<string, PlayerDetail> = {};

      for (const player of players) {
        record[player.name] = player;
      }

      return record;
    },
    [players]
  );

  // Effect to fetch data based on the group id
  useEffect(() => {
    if (groupId) {
      fetchData({ id: groupId });
    }
  }, [groupId, fetchData]);

  return <GroupContext.Provider value={{ playerRecord, players, error, isLoading }}>{children}</GroupContext.Provider>;
};
