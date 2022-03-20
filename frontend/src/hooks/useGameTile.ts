import { Turn } from '@reversi/util';
import { makeTurn } from '@reversi/util/makeTurn';
import { currentPlayerAtom, fieldAtom, TileState } from '@reversi/util/state';
import { useAtom } from 'jotai';

export const useGameTile = (x: number, y: number) => {
  const [field, setField] = useAtom(fieldAtom);
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom);

  const state = field[y][x];
  const onClick = () => {
    setField((field) => makeTurn(field, currentPlayer, { x, y }));
    setCurrentPlayer(
      currentPlayer === Turn.PLAYER1 ? Turn.PLAYER2 : Turn.PLAYER1
    );
  };

  return { state, onClick };
};
