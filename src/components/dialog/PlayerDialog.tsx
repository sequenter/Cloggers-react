import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { Icon, IconButton, ModeIcon } from '@components';
import { Dialog, type DialogHandle } from '@components/dialog/Dialog';

import { useGroup } from '@hooks/useGroup';

import { ITEMS } from '@utils/constants';
import { arrowLeftIcon, gnomeIcon, searchIcon } from '@utils/icon';

export interface PlayerDialogHandle {
  open: Runnable;
}

// There doesn't seem to be an inherant way to have a forwardRef without props in TS without ESLint throwing errors, use 'unknown' as the
// props type to resolve this
export const PlayerDialog = forwardRef<PlayerDialogHandle, unknown>((_, ref) => {
  const [uniqueItems, setUniqueItems] = useState<Array<string>>([]);
  const [title, setTitle] = useState('Group Members');

  const { playerRecords } = useGroup();

  const dialog = useRef<DialogHandle>(null);

  const syncedPlayers = useMemo(
    /**
     * Filter and sort synced players.
     */
    () =>
      Object.entries(playerRecords)
        .filter(([_, { isSynced }]) => isSynced)
        .sort((a, b) => a[0].localeCompare(b[0])),
    [playerRecords]
  );

  const unsyncedPlayers = useMemo(
    /**
     * Filter and sort unsynced players.
     */
    () =>
      Object.entries(playerRecords)
        .filter(([_, { isSynced }]) => !isSynced)
        .sort((a, b) => a[0].localeCompare(b[0])),
    [playerRecords]
  );

  /**
   * Open dialog.
   */
  const onOpenDialog = () => {
    if (dialog.current) {
      dialog.current.open();
    }
  };

  /**
   * On player uniques button press, update states to show items.
   * @param {string} player Player name
   * @param {Array<string>} uniques Player's unique items
   */
  const onShowUniques = (player: string, uniques: Array<string>) => {
    setTitle(`${player}'s Unique Collections`);
    setUniqueItems(uniques);
  };

  /**
   * On player uniques return button press.
   */
  const onCloseUniques = () => {
    setTitle('Group Members');
    setUniqueItems([]);
  };

  useImperativeHandle(ref, () => ({
    open: onOpenDialog
  }));

  return (
    <Dialog
      ref={dialog}
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
            .map((item) => [item, ITEMS[item]])
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([item, itemName]) => (
              <li className="flex items-center gap-2 px-2 even:bg-primary-50">
                <div className={`sprite-icon id_${item}`}></div>

                <span>{itemName}</span>
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
            {syncedPlayers.map(([player, { items, gameMode, uniques }]) => (
              <li
                key={player}
                className="px-2 even:bg-primary-50"
              >
                <div className="grid grid-cols-4 text-xl">
                  <span>{player}</span>

                  <span className="flex justify-end">{items.length}</span>

                  <div className="flex gap-2 justify-end">
                    <span>{uniques.length}</span>

                    {uniques.length > 0 && (
                      <button
                        onClick={() => {
                          onShowUniques(player, uniques);
                        }}
                      >
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
                </div>
              </li>
            ))}
          </ul>

          {unsyncedPlayers.length > 0 && (
            <details className="open:[&>summary]:border-b-2">
              <summary className="sticky top-0 text-xl px-2 cursor-pointer border-t-2 border-grey-50 bg-primary-300 text-white">
                {`Unsynced members (${unsyncedPlayers.length})`}
              </summary>

              <ul className="text-xl w-full">
                {unsyncedPlayers.map(([player, { gameMode }]) => (
                  <li
                    key={player}
                    className="flex items-center justify-between gap-2 px-2 even:bg-primary-50"
                  >
                    <span>{player}</span>

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
});
