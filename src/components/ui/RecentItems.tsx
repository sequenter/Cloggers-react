import { CollectionItem } from '@components';

import { useRecent } from '@hooks/useRecent';
import { useSearch } from '@hooks/useSearch';

import { clsx } from 'clsx';

const RecentItems = () => {
  const { selectedPlayers } = useSearch();
  const { recentItems } = useRecent();

  return (
    <div className="flex flex-col gap-2 p-2 border-2 border-black bg-grey-100">
      <div className="relative flex items-center justify-center gap-4 p-2 border-2 border-grey-50 bg-primary-100">
        <span className="font-bold text-2xl">Recently Collected Items</span>
      </div>

      <div className="flex p-2 border-2 gap-8 overflow-x-scroll overflow-y-hidden whitespace-nowrap border-grey-50 bg-primary-100">
        {recentItems.length ? (
          recentItems.map((recentItem) => (
            <div
              key={recentItem.item + recentItem.player}
              className="flex flex-col items-center"
            >
              <CollectionItem
                {...recentItem}
                disableCount
              />
              <span>{recentItem.player}</span>
              <span
                className={clsx(
                  (!selectedPlayers.length || selectedPlayers.length > 1) && recentItem.playersCollected.length === 1
                    ? 'text-green'
                    : recentItem.notable_item
                      ? 'text-yellow'
                      : 'text-white'
                )}
              >
                {new Date(recentItem.date_unix * 1000).toLocaleDateString('en-GB')}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full">
            <span className="text-lg">Search for a group to view recently collected items</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentItems;
