import { Coords, Field } from '@reversi/types';
import { neighbors, Turn } from '.';
import { isLegalMove } from './isLegalMove';
import { makeTurn } from './makeTurn';
import { TileState } from './state';

function getAffectedCellsList(
  field: Field,
  { x: col, y: row }: Coords,
  color: TileState
) {
  const res: Coords[] = [];
  const opColor =
    color === TileState.PLAYER1 ? TileState.PLAYER2 : TileState.PLAYER1;
  let colX: number;
  let rowY: number;

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
      res.push({ x: colX, y: rowY });
      rowY += neighbor[0];
      colX += neighbor[1];

      while (
        rowY >= 0 &&
        colX >= 0 &&
        rowY < field.length &&
        colX < field[0].length
      ) {
        if (field[rowY][colX] === color) {
          break;
        }
        if (field[rowY][colX] === TileState.EMPTY) {
          break;
        }

        res.push({ x: colX, y: rowY });
        rowY += neighbor[0];
        colX += neighbor[1];
      }
    }
  }

  return res;
}

function oneStepAssessMove(
  field: Field,
  move: Coords,
  player: TileState.PLAYER1 | TileState.PLAYER2
): number {
  const affectedCells = getAffectedCellsList(field, move, player);
  let R = 0;

  for (const { x, y } of affectedCells) {
    if (x === 0 || y === 0) R += 2;
    else R += 1;
  }

  if (
    (move.x === 0 || move.x === field[0].length) &&
    (move.y === 0 || move.y === field.length)
  )
    R += 0.8;
  else if (
    move.x === 0 ||
    move.x === field[0].length ||
    move.y === 0 ||
    move.y === field.length
  )
    R += 0.4;

  return R;
}

export function easyAiFindOptimalMove(
  field: Field,
  possibleMoves: Coords[],
  color: TileState.PLAYER1 | TileState.PLAYER2
): [Coords, number] {
  let maxR = -1;
  let bestMove: Coords = possibleMoves[0]; // Mostly so that Typescript doesn't complain about being used before assigned

  for (const move of possibleMoves) {
    const R = oneStepAssessMove(field, move, color);

    if (R > maxR) {
      maxR = R;
      bestMove = move;
    }
  }

  return [bestMove, maxR];
}

export function proAiFindOptimalMove(
  field: Field,
  possibleMoves: Coords[],
  player: TileState.PLAYER1 | TileState.PLAYER2
): Coords {
  let maxR = -1;
  let bestMove: Coords = possibleMoves[0];

  for (const move of possibleMoves) {
    let R = oneStepAssessMove(field, move, player);
    const nextField = makeTurn(
      field,
      player === TileState.PLAYER1 ? Turn.PLAYER1 : Turn.PLAYER2,
      move
    );
    const possibleNextMoves: Coords[] = [];
    for (let row = 0; row < field.length; row++) {
      for (let col = 0; col < field[row].length; col++) {
        const isLegal = isLegalMove(
          field,
          player === TileState.PLAYER1 ? Turn.PLAYER2 : Turn.PLAYER1,
          col,
          row
        );
        if (isLegal) possibleNextMoves.push({ x: col, y: row });
      }
    }
    R -= easyAiFindOptimalMove(
      nextField,
      possibleNextMoves,
      player === TileState.PLAYER1 ? TileState.PLAYER2 : TileState.PLAYER1
    )[1];

    if (R > maxR) {
      maxR = R;
      bestMove = move;
    }
  }

  return bestMove;
}
