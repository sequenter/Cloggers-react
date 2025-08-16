import { ITEMS, MAIN_CATEGORIES, SUB_CATEGORIES } from '../src/utils/constants.ts';

import * as fs from 'fs';

const ITEM_MAP = Object.entries(ITEMS).reduce((acc, [item, name]) => ({ ...acc, [item]: { name, categories: [] } }), {});

for (const [subCategory, { items }] of Object.entries(SUB_CATEGORIES)) {
  for (const item of items) {
    ITEM_MAP[item].categories.push(subCategory);
  }
}

console.dir(Object.keys(SUB_CATEGORIES), { maxArrayLength: null });

//fs.writeFileSync('./items.json', JSON.stringify(ITEM_MAP, null, 2), 'utf-8');
