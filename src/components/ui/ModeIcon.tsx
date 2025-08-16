import { useGroup } from '@hooks/useGroup';

import { gameModeIcon } from '@utils/icon';

interface Props {
  minMode?: number;
  player: string;
}

const ModeIcon = ({ minMode = 1, player }: Props) => {
  const { playerRecords } = useGroup();

  const playerRecord = playerRecords[player];

  return (
    playerRecord !== undefined &&
    playerRecord.gameMode >= minMode && (
      <div className="flex items-center justify-center w-6 h-6 bg-black border-2 border-grey-50">
        <img
          className="w-4 h-4"
          alt="IM"
          src={gameModeIcon[playerRecord.gameMode]}
        />
      </div>
    )
  );
};

export default ModeIcon;
