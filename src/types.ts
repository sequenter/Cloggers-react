/* Fetch */

export interface FetchResponse<T> {
  data: T;
}

/* Common */

export interface ItemDetail {
  item: string;
  playersCollected: Array<string>;
  playersNotCollected: Array<string>;
}

export interface PlayerDetail {
  player: string;
  gameMode: number;
  isSynced: boolean;
  uniques: Array<string>;
}

/* Group Collections */

interface CollectionMember {
  player: string;
  player_name_with_capitalization: string;
  last_checked: string;
  last_changed: string;
  ehc: number;
  ehc_gilded: number;
  total_collections_finished: number;
  total_categories_finished: number;
  items: Array<number>;
}

export interface FetchGroupCollections {
  categories: string;
  group_id: number;
  group_name: string;
  member_count: number;
  members: Array<CollectionMember>;
  members_with_items_synced: number;
  total_collections_available: number;
  total_categories_available: number;
}

/* Group Stats */

// There's more data available from the API, but we only want 'game_mode' for now
interface StatsMember {
  game_mode: number;
  player: string;
  player_name_with_capitalization: string | null;
}

export interface FetchGroupMemberStats {
  memberlist: Record<string, StatsMember>;
}
