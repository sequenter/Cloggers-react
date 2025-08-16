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
     * Creates an array of player details from the group member list.
     * @returns {Array<PlayerDetail>} Player details
     */
    (): Array<PlayerDetail> => {
      if (data && collectedItems.length) {
        // Get collections that have only been collected by a single player
        const collectedUniqueItems = collectedItems.filter(({ playersCollected }) => playersCollected.length === 1);

        return Object.values(data.memberlist).map(({ player, player_name_with_capitalization, game_mode }) => {
          const playerName = player_name_with_capitalization ?? player;
          const isSynced = playersWithCollections.includes(playerName);

          return {
            player: playerName,
            gameMode: game_mode,
            uniques: isSynced
              ? collectedUniqueItems.filter(({ playersCollected }) => playersCollected.includes(playerName)).map(({ item }) => item)
              : [],
            isSynced
          };
        });
      }

      return [];
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
