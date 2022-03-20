import { Coords, Field } from '@reversi/types';
import cloneDeep from 'lodash.clonedeep';
import { neighbors, Turn } from '.';
import { TileState } from './state';

export function makeTurn(
  startField: Field,
  player: Turn,
  { x, y }: Coords
): Field {
  const opColor =
    player === Turn.PLAYER1 ? TileState.PLAYER2 : TileState.PLAYER1;
  const color = player === Turn.PLAYER1 ? TileState.PLAYER1 : TileState.PLAYER2;
  let colX: number;
  let rowY: number;

  const field = cloneDeep(startField);

  field[y][x] = color;

  for (const neighbor of neighbors) {
    rowY = y + neighbor[0];
    colX = x + neighbor[1];

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
          let stepY = rowY - neighbor[0];
          let stepX = colX - neighbor[1];

          while (stepY !== y || stepX !== x) {
            field[stepY][stepX] = color;

            stepY -= neighbor[0];
            stepX -= neighbor[1];
          }
          break;
        }
        if (field[rowY][colX] === TileState.EMPTY) {
          break;
        }

        rowY += neighbor[0];
        colX += neighbor[1];
      }
    }
  }

  return field;
}
