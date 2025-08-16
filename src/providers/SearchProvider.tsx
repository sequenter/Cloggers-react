import { type ReactNode, useState } from 'react';

import { SearchContext } from '@hooks/useSearch';

interface Props {
  children: ReactNode;
}

export const SearchProvider = ({ children }: Props) => {
  const [groupId, setGroupId] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<Array<string>>([]);

  /**
   * Appends or removes a player depending if the player is already selected.
   * @param {string} player Player to toggle
   */
  const toggleSelectedPlayer = (player: string) =>
    setSelectedPlayers((curr) => (curr.includes(player) ? curr.filter((currValue) => currValue !== player) : [...curr, player]));

  /**
   * Reset selected players.
   */
  const resetSelectedPlayers = () => setSelectedPlayers([]);

  return (
    <SearchContext.Provider
      value={{ groupId, selectedPlayers, setGroupId, resetSelectedPlayers, setSelectedPlayers, toggleSelectedPlayer }}
    >
      {children}
    </SearchContext.Provider>
  );
};
