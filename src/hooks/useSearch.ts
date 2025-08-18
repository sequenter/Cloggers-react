import { createContext, useContext } from 'react';

interface Search {
  groupId: string;
  selectedPlayers: Array<string>;
  isSelectedPlayer: Predicate<string>;
  setGroupId: Consumer<string>;
  resetSelectedPlayers: Runnable;
  setSelectedPlayers: Consumer<Array<string>>;
  toggleSelectedPlayer: Consumer<string>;
}

export const SearchContext = createContext<Search>({
  groupId: '',
  selectedPlayers: [],
  isSelectedPlayer: () => false,
  setGroupId: () => {},
  resetSelectedPlayers: () => {},
  setSelectedPlayers: () => {},
  toggleSelectedPlayer: () => {}
});

export const useSearch = () => useContext(SearchContext);
