import { gameModeIcon } from '@utils/icon';

interface Props {
  gameMode: number;
  minMode?: number;
}

const ModeIcon = ({ gameMode, minMode = 1 }: Props) => {
  return (
    gameMode >= minMode && (
      <div className="flex items-center justify-center w-6 h-6 bg-black border-2 border-grey-50">
        <img
          className="w-4 h-4"
          alt="IM"
          src={gameModeIcon[gameMode]}
        />
      </div>
    )
  );
};

export default ModeIcon;
