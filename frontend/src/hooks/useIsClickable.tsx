import { useEffect } from 'react';
import {
  clickableTilesAtom,
  currentPlayerAtom,
  fieldAtom,
  fieldSettingsAtom,
} from '@reversi/util/state';
import { useAtom } from 'jotai';
import { isLegalMove } from '../util/isLegalMove';

export const useIsClickable = (x: number, y: number) => {
  const [clickableTiles] = useAtom(clickableTilesAtom);
  return clickableTiles[y][x];
};

export const ClickableTilesController = () => {
  const [_, setClickableTiles] = useAtom(clickableTilesAtom);
  const [currentPlayer] = useAtom(currentPlayerAtom);
  const [field] = useAtom(fieldAtom);
  const [fieldSettings] = useAtom(fieldSettingsAtom);

  useEffect(() => {
    setClickableTiles((clickableTiles) => {
      for (let row = 0; row < fieldSettings.height; row++) {
        for (let col = 0; col < fieldSettings.width; col++) {
          const isLegal = isLegalMove(field, currentPlayer, col, row);
          clickableTiles[row][col] = isLegal;
        }
      }

      return [...clickableTiles.map((x) => [...x])];
    });
  }, [fieldSettings, field, currentPlayer, setClickableTiles]);

  return <></>;
};
