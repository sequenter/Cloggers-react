import { clsx } from 'clsx';
import { useCallback, useMemo } from 'react';

import { useGroup } from '@hooks/useGroup';
import { useSearch } from '@hooks/useSearch';

import { closeIcon, ironmanIcon } from '@utils/icon';

import { IconButton, ModeIcon } from '@components';

const Ranking = () => {
  const { selectedPlayers, resetSelectedPlayers, setSelectedPlayers, toggleSelectedPlayer } = useSearch();
  const { playerRecords } = useGroup();

  const rankings = useMemo(
    /**
     * Filter players by their synced status and sort them by their amount of collections.
     */
    () => {
      return Object.entries(playerRecords)
        .map(([player, { items, isSynced }]) => ({ player, isSynced, itemsCollected: items.length }))
        .filter(({ isSynced }) => isSynced)
        .sort((a, b) => b.itemsCollected - a.itemsCollected);
    },
    [playerRecords]
  );

  const onFilterIronman = useCallback(
    /**
     * On filter ironman button press, filter players by their game mode.
     */
    () => {
      setSelectedPlayers(
        Object.entries(playerRecords).reduce(
          (acc, [player, { gameMode, isSynced }]) => (isSynced && gameMode > 0 ? [...acc, player] : acc),
          [] as Array<string>
        )
      );
    },
    [playerRecords, setSelectedPlayers]
  );

  return (
    <div className="flex flex-col gap-2 p-2 border-2 border-black bg-grey-100">
      <div className="relative flex items-center justify-center gap-4 p-2 border-2 border-grey-50 bg-primary-100">
        <span className="font-bold text-2xl">Group Rankings</span>

        <div className="absolute left-2 flex items-center gap-2">
          <IconButton
            title="Filter by ironman"
            disabled={!rankings.length}
            path={ironmanIcon}
            onClick={onFilterIronman}
            image
          />
        </div>

        <div className="absolute right-2 flex items-center gap-2">
          {selectedPlayers.length > 0 && (
            <span className="invisible sm:visible">
              {`Filtering ${selectedPlayers.length} member${selectedPlayers.length === 1 ? '' : 's'}`}
            </span>
          )}

          <IconButton
            title="Clear filter"
            disabled={!selectedPlayers.length}
            path={closeIcon}
            onClick={() => resetSelectedPlayers()}
          />
        </div>
      </div>

      <div className="flex p-2 border-2 gap-2 overflow-x-scroll overflow-y-hidden whitespace-nowrap border-grey-50 bg-primary-100">
        {rankings.length ? (
          <>
            {rankings.map(({ player, itemsCollected }, i) => (
              <button
                key={player}
                className={clsx(
                  'flex items-center border-2 border-grey-50',
                  selectedPlayers.includes(player) ? 'bg-selected' : 'bg-primary-300'
                )}
                onClick={() => toggleSelectedPlayer(player)}
              >
                {i < 3 && (
                  <span
                    className={clsx(
                      'text-2xl px-2 border-r-2 font-bold text-shadow-none bg-linear-to-r text-black border-grey-50',
                      i === 0 && 'from-yellow-200 to-yellow-500',
                      i === 1 && 'from-gray-200 to-gray-500',
                      i === 2 && 'from-amber-800 to-amber-950'
                    )}
                  >
                    {i + 1}
                  </span>
                )}{' '}
                <div className="flex items-center justify-between gap-2 px-2 w-full">
                  <span className="text-xl">{`${i > 2 ? `${i + 1}.` : ''} ${player}`}</span>

                  <div className="flex items-center gap-2">
                    <ModeIcon player={player} />

                    <span className="text-xl text-white">{itemsCollected}</span>
                  </div>
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <span className="text-lg">Search for a group to view rankings</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;
