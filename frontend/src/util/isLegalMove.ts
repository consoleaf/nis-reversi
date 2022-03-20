import { neighbors, Turn } from '.';
import { TileState } from './state';

export const isLegalMove = (
  field: TileState[][],
  player: Turn,
  col: number,
  row: number
): boolean => {
  const opColor =
    player === Turn.PLAYER1 ? TileState.PLAYER2 : TileState.PLAYER1;
  const color = player === Turn.PLAYER1 ? TileState.PLAYER1 : TileState.PLAYER2;
  let colX: number;
  let rowY: number;

  if (field[row][col]) return false;

  for (const neighbor of neighbors) {
    rowY = row + neighbor[0];
    colX = col + neighbor[1];

    if (
      rowY < 0 ||
      colX < 0 ||
      rowY >= field.length ||
      colX >= field[0].length
    ) {
      continue;
    }

    if (field[rowY][colX] === opColor) {
      rowY += neighbor[0];
      colX += neighbor[1];

      while (
        rowY >= 0 &&
        colX >= 0 &&
        rowY < field.length &&
        colX < field[0].length
      ) {
        if (field[rowY][colX] === color) {
          return true;
        }
        if (field[rowY][colX] === TileState.EMPTY) {
          break;
        }

        rowY += neighbor[0];
        colX += neighbor[1];
      }
    }
  }
  return false;
};
