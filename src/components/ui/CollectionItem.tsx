import { ItemDialog } from '@components/dialog/ItemDialog';

import { useDialog } from '@hooks/useDialog';

import { clsx } from 'clsx';

interface Props {
  disableCount?: boolean;
  item: string;
  name: string;
  playersCollected: Array<string>;
  playersNotCollected: Array<string>;
  scale?: string;
  size?: string;
}

const CollectionItem = ({
  disableCount = false,
  item,
  name,
  playersCollected,
  playersNotCollected,
  scale = 'scale-200',
  size = 'w-18 h-18'
}: Props) => {
  const { open } = useDialog();

  return (
    <button
      className={clsx('relative flex justify-center items-center', size)}
      onClick={() =>
        open(
          <ItemDialog
            item={item}
            name={name}
            playersCollected={playersCollected}
            playersNotCollected={playersNotCollected}
          />
        )
      }
    >
      {!disableCount && playersCollected.length > 0 && (
        <span className="absolute text-lg z-10 top-0 left-0 text-shadow-runescape text-yellow">{playersCollected.length}</span>
      )}

      <div className={clsx(`sprite-icon id_${item}`, scale, playersCollected.length === 0 && 'opacity-50')}></div>
    </button>
  );
};

export default CollectionItem;
