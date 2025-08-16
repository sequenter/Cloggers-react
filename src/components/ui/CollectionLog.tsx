import { clsx } from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import { CollectionItem } from '@components';

import { useCollections } from '@hooks/useCollections';
import { useGroup } from '@hooks/useGroup';

import { type MainCategories, type SubCategories } from '@types';

import { ITEMS, MAIN_CATEGORIES, SUB_CATEGORIES } from '@utils/constants';

const COLLECTION_LOG_TABS = Object.keys(MAIN_CATEGORIES) as Array<MainCategories>;

const CollectionLog = () => {
  const [selectedTab, setSelectedTab] = useState<MainCategories>(COLLECTION_LOG_TABS[0]);
  const [selectedCategory, setSelectedCategory] = useState<SubCategories>(MAIN_CATEGORIES[selectedTab][0] as SubCategories);

  const { collectedItems, collectedItemsByCategory } = useCollections();
  const { players } = useGroup();

  const subCategories = useMemo(
    /**
     * Sub categories related to the selected main category.
     */
    () => MAIN_CATEGORIES[selectedTab] as Array<SubCategories>,
    [selectedTab]
  );

  const categoryItems = useMemo(
    /**
     * Category items related to the selected sub category, with item collection detail.
     */
    () =>
      SUB_CATEGORIES[selectedCategory].items.map(
        (item) =>
          collectedItemsByCategory[selectedCategory]?.[item] ?? {
            item,
            categories: ITEMS[item].categories,
            name: ITEMS[item].name,
            playersCollected: [],
            playersNotCollected: []
          }
      ),
    [collectedItemsByCategory, players, selectedCategory]
  );

  const totalCollectedCategoryItems = useMemo(
    /**
     * Amount of collected items for the currently selected sub category.
     */
    () => Object.keys(collectedItemsByCategory[selectedCategory] ?? []).length,
    [collectedItemsByCategory, selectedCategory]
  );

  const isCategoryGreenLogged = useCallback(
    /**
     * Determines whether or not a given sub category has been completed in full.
     * @param {SubCategories} subCategory Sub category to determine
     */
    (subCategory: SubCategories) => {
      return Object.keys(collectedItemsByCategory[subCategory] || []).length === SUB_CATEGORIES[subCategory].items.length;
    },
    [collectedItemsByCategory]
  );

  /**
   * On maain category tab pressed, update the selected category and sub category.
   * @param {MainCategories} category Selected category
   */
  const onCategorySelected = (category: MainCategories) => {
    setSelectedTab(category);
    setSelectedCategory(MAIN_CATEGORIES[category][0] as SubCategories);
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-2 border-black bg-grey-100">
      <div className="flex justify-center py-2 border-2 border-grey-50 bg-primary-100">
        <span className="font-bold text-2xl">
          Collection Log - {collectedItems.length}/{Object.keys(ITEMS).length}
        </span>
      </div>

      <div className="flex flex-col pt-2 border-2 border-grey-50 bg-primary-100">
        <div className="grid grid-cols-5 gap-2 border-b-2 border-grey-50">
          {COLLECTION_LOG_TABS.map((category) => (
            <button
              key={category}
              className={clsx(
                'capitalize text-xl text-shadow-runescape rounded-t-lg border-t-2 border-l-2 border-r-2 border-grey-50',
                selectedTab === category ? 'bg-primary-200' : 'bg-primary-300 hover:bg-primary-200'
              )}
              onClick={() => onCategorySelected(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-7 h-120 overflow-hidden">
          <ul className="col-span-2 overflow-x-hidden overflow-y-scroll">
            {subCategories.map((subCategory) => (
              <li
                key={subCategory}
                className={clsx(subCategory === selectedCategory ? 'bg-selected' : 'even:bg-primary-50 hover:bg-selected')}
              >
                <button
                  className={clsx(
                    'capitalize text-xl text-shadow-runescape pl-1 w-full text-left',
                    isCategoryGreenLogged(subCategory) && 'text-green'
                  )}
                  onClick={() => setSelectedCategory(subCategory)}
                >
                  {subCategory.replaceAll('_', ' ')}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col col-span-5 border-l-2 border-primary-50 overflow-hidden">
            <div className="flex flex-col px-4 border-b-2 border-primary-50">
              <span className="capitalize font-bold text-2xl">{selectedCategory.replaceAll('_', ' ')}</span>

              <div className="flex gap-2">
                <span className="text-xl">Obtained: </span>
                <span
                  className={clsx(
                    'text-xl',
                    totalCollectedCategoryItems === 0 && 'text-red',
                    totalCollectedCategoryItems === categoryItems.length && 'text-green',
                    totalCollectedCategoryItems > 0 && totalCollectedCategoryItems < categoryItems.length && 'text-yellow'
                  )}
                >
                  {totalCollectedCategoryItems}/{categoryItems.length}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 content-start px-4 py-2 grow overflow-x-hidden overflow-y-scroll">
              {categoryItems.map((categoryItem) => (
                <CollectionItem
                  key={categoryItem.item}
                  {...categoryItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionLog;
