import { Icon, IconButton } from '@components';
import { PlayerDialog } from '@components/dialog/PlayerDialog';

import { useCollections } from '@hooks/useCollections';
import { useDialog } from '@hooks/useDialog';
import { useGroup } from '@hooks/useGroup';
import { useSearch } from '@hooks/useSearch';

import { collectionsIcon, gnomeIcon, searchIcon, spinnerIcon } from '@utils/icon';

import { type FormEvent, useEffect, useState } from 'react';

const Header = () => {
  const [searchGroupId, setSearchGroupId] = useState('');

  const { data, error, isLoading } = useCollections();
  const { open } = useDialog();
  const { players } = useGroup();
  const { groupId, resetSelectedPlayers, setGroupId } = useSearch();

  /**
   * On group search.
   * @param {FormEvent | MouseEvent} e Form submit or button press event
   */
  const onSearch = (e: FormEvent | MouseEvent) => {
    e.preventDefault();

    resetSelectedPlayers();
    setGroupId(searchGroupId);
  };

  useEffect(() => {
    setSearchGroupId(groupId);
  }, [groupId]);

  return (
    <div className="pb-2 border-b-2 border-black bg-grey-100">
      <div className="py-4 border-b-2 border-grey-50 bg-primary-100">
        <div className="flex items-center justify-between container mx-auto px-2">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <img
                className="h-8 w-8"
                alt="collections icon"
                src={collectionsIcon}
              />

              <span className="text-2xl">Cloggers</span>
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <form
                className="flex items-center rounded-l-sm px-2 border-2 border-grey-50 bg-primary-300"
                onSubmit={() => setGroupId(searchGroupId)}
              >
                <input
                  autoComplete="off"
                  id="input-group-id"
                  className="text-shadow-runescape focus:outline-none"
                  placeholder="Input group id..."
                  value={searchGroupId}
                  onChange={(e) => setSearchGroupId(e.target.value)}
                />

                {isLoading ? (
                  <img
                    className="w-4 h-4"
                    alt="..."
                    src={spinnerIcon}
                  />
                ) : (
                  <button
                    aria-label="Search"
                    onClick={onSearch}
                  >
                    <Icon
                      className="w-4 h-4"
                      title="Search"
                      path={searchIcon}
                    />
                  </button>
                )}
              </form>

              {error && <span className="text-md text-red">{error.message}</span>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {data && (
              <div className="flex items-center gap-1">
                <span className="hidden md:flex whitespace-nowrap">{data.group_name}</span>

                <span className="hidden lg:flex">{`(${data.member_count} members, ${data.members_with_items_synced} synced)`}</span>
              </div>
            )}

            <IconButton
              title="View group members"
              disabled={!players.length}
              path={gnomeIcon}
              onClick={() => open(<PlayerDialog />)}
              image
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
