import { type ReactNode, useEffect, useMemo } from 'react';

import { useCollections } from '@hooks/useCollections';
import { useFetch } from '@hooks/useFetch';
import { RecentContext } from '@hooks/useRecent';
import { useSearch } from '@hooks/useSearch';

import type { FetchRecentItem } from '@types';

import { getUnixDateSubtract } from '@utils/common';

interface Props {
  children: ReactNode;
}

const MIN_UNIX_TIMESTAMP = getUnixDateSubtract(1);

export const RecentProvider = ({ children }: Props) => {
  const { groupId, selectedPlayers } = useSearch();
  const { collectedItemsRecord } = useCollections();
  const { data, error, isLoading, fetchData } = useFetch<Array<FetchRecentItem>>('collection-log/group_recent_items');

  const recentItems = useMemo(
    /**
     * Filter recent items not exceeding the last month.
     */
    () => {
      if (data && Object.keys(collectedItemsRecord).length > 0) {
        return data
          .filter(
            ({ date_unix, player, player_name_with_capitalization }) =>
              date_unix >= MIN_UNIX_TIMESTAMP &&
              (!selectedPlayers.length || selectedPlayers.includes(player_name_with_capitalization ?? player))
          )
          .map(({ id, ...rest }) => ({ ...collectedItemsRecord[id], ...rest }));
      }

      return [];
    },
    [data, collectedItemsRecord]
  );

  // Effect to fetch data based on the group id
  useEffect(() => {
    if (groupId) {
      fetchData({ group: groupId, count: '200' });
    }
  }, [groupId, fetchData]);

  return <RecentContext.Provider value={{ recentItems, error, isLoading }}>{children}</RecentContext.Provider>;
};
