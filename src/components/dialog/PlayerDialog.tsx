import { Icon, IconButton, ModeIcon } from '@components';
import { Dialog } from '@components/dialog/Dialog';

import { useGroup } from '@hooks/useGroup';

import type { ItemDetail } from '@types';

import { bifilter } from '@utils/common';
import { arrowLeftIcon, gnomeIcon, searchIcon } from '@utils/icon';

import { useMemo, useState } from 'react';

export const PlayerDialog = () => {
  const [uniqueItems, setUniqueItems] = useState<Array<ItemDetail>>([]);
  const [title, setTitle] = useState('Group Members');

  const { players } = useGroup();

  const [unsyncedPlayers, syncedPlayers] = useMemo(
    /**
     * Filter and sort synced players.
     */
    () =>
      bifilter(
        Object.values(players).sort((a, b) => +a.isSynced - +b.isSynced || a.name.localeCompare(b.name)),
        ({ isSynced }) => isSynced
      ),
    [players]
  );

  /**
   * On player uniques button press, update states to show items.
   * @param {string} playerName Player name
   * * @param {Array<ItemDetail>} uniques Player's unique collections
   */
  const onShowUniques = (playerName: string, uniques: Array<ItemDetail>) => {
    setTitle(`${playerName}'s Unique Collections`);
    setUniqueItems(uniques);
  };

  /**
   * On player uniques return button press.
   */
  const onCloseUniques = () => {
    setTitle('Group Members');
    setUniqueItems([]);
  };

  return (
    <Dialog
      title={title}
      onClose={onCloseUniques}
      controls={
        uniqueItems.length > 0 && (
          <IconButton
            title="Return"
            path={arrowLeftIcon}
            onClick={onCloseUniques}
          />
        )
      }
      icon={
        <img
          className="w-6 h-6"
          src={gnomeIcon}
        />
      }
    >
      {uniqueItems.length > 0 ? (
        <ul className="text-xl w-full">
          {uniqueItems
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ item, name }) => (
              <li
                key={item}
                className="flex items-center gap-2 px-2 even:bg-primary-50"
              >
                <div className={`sprite-icon id_${item}`}></div>

                <span>{name}</span>
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex flex-col w-full whitespace-nowrap overflow-auto">
          <div className="sticky top-0 grid grid-cols-4 text-xl px-2 border-b-2 border-grey-50 text-white bg-primary-300">
            <span className="flex justify-center">Member</span>
            <span className="flex justify-center">Collections</span>
            <span className="flex justify-center">Uniques</span>
            <span className="flex justify-center">Game Mode</span>
          </div>

          <ul className="text-xl w-full">
            {syncedPlayers.map(({ name, gameMode, totalItemsCollected, uniques }) => (
              <li
                key={name}
                className="px-2 grid grid-cols-4 text-xl even:bg-primary-50"
              >
                <span>{name}</span>

                <span className="flex justify-end">{totalItemsCollected}</span>

                <div className="flex gap-2 justify-end">
                  <span>{uniques.length}</span>

                  {uniques.length > 0 && (
                    <button onClick={() => onShowUniques(name, uniques)}>
                      <Icon
                        className="w-4 h-4"
                        title="Show uniques"
                        path={searchIcon}
                      />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <ModeIcon gameMode={gameMode} />
                </div>
              </li>
            ))}

            <li className="px-2 grid grid-cols-4 text-xl text-white even:bg-primary-50">
              <span>-</span>
              <span className="flex justify-end">
                {syncedPlayers.reduce((acc, { totalItemsCollected }) => acc + totalItemsCollected, 0)}
              </span>
              <span className="flex justify-end">{syncedPlayers.reduce((acc, { uniques }) => acc + uniques.length, 0)}</span>
              <span className="flex justify-end">-</span>
            </li>
          </ul>

          {unsyncedPlayers.length > 0 && (
            <details className="open:[&>summary]:border-b-2">
              <summary className="sticky top-0 text-xl px-2 cursor-pointer border-t-2 border-grey-50 bg-primary-300 text-white">
                {`Unsynced members (${unsyncedPlayers.length})`}
              </summary>

              <ul className="text-xl w-full">
                {unsyncedPlayers.map(({ name, gameMode }) => (
                  <li
                    key={name}
                    className="flex items-center justify-between gap-2 px-2 even:bg-primary-50"
                  >
                    <span>{name}</span>

                    <ModeIcon gameMode={gameMode} />
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </Dialog>
  );
};
