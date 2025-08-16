import CollectionItem from './CollectionItem';

import type { ItemDetail } from '@types';

interface Props {
  items: Array<ItemDetail>;
  title: string;
}

const FeaturedItems = ({ items, title }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-2 border-2 border-black bg-grey-100">
      <div className="flex items-center justify-center gap-4 py-2 border-2 border-grey-50 bg-primary-100">
        <span className="capitalize font-bold text-2xl">{title}</span>
      </div>

      <div className="p-2 border-2 border-grey-50 bg-primary-100">
        {items.length > 0 ? (
          <div className="grid grid-cols-10">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-center"
              >
                <CollectionItem
                  scale="scale-100"
                  size="w-9 h-9"
                  {...item}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <span className="text-lg">Search for a group to view {title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedItems;
