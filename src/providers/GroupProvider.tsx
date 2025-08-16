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

  const playerRecords = useMemo(
    /**
     * Creates a map of player details indexed by the player name.
     * @returns {Record<string, PlayerDetail>} Player details
     */
    (): Record<string, PlayerDetail> => {
      if (data && collectedItems.length) {
        // Get collections that have only been collected by a single player
        const collectedUniqueItems = collectedItems.filter(({ playersCollected }) => playersCollected.length === 1);

        return Object.values(data.memberlist).reduce((acc, { player, player_name_with_capitalization, game_mode }) => {
          const playerName = player_name_with_capitalization ?? player;
          const playerCollection = playersWithCollections[playerName];
          const isSynced = !!playerCollection;

          return {
            ...acc,
            [playerName]: {
              gameMode: game_mode,
              items: playerCollection ?? [],
              uniques: isSynced
                ? collectedUniqueItems.filter(({ playersCollected }) => playersCollected.includes(playerName)).map(({ item }) => item)
                : [],
              isSynced
            }
          };
        }, {});
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

  return <GroupContext.Provider value={{ playerRecords, error, isLoading }}>{children}</GroupContext.Provider>;
};
