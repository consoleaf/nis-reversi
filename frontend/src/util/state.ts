import { atom, useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';
import { Turn } from '../util';

export enum TileState {
  EMPTY,
  PLAYER1,
  PLAYER2,
}

function make2DArray<T>(w: number, h: number, val: T) {
  const newField = Array<T[]>(h);
  for (let i = 0; i < h; i++) {
    newField[i] = Array<T>(w).fill(val);
  }
  return newField;
}
const makeField = (w: number, h: number) => {
  if (w % 2 !== 0 || h % 2 !== 0)
    throw new Error('Dimension numbers have to be even');
  const field = make2DArray(w, h, TileState.EMPTY);
  const w2 = w / 2;
  const h2 = h / 2;

  field[w2][h2] = TileState.PLAYER2;
  field[w2 - 1][h2] = TileState.PLAYER1;
  field[w2][h2 - 1] = TileState.PLAYER1;
  field[w2 - 1][h2 - 1] = TileState.PLAYER2;
  return field;
};

export const gameAtom = atom({
  settings: { width: 8, height: 8 },
  field: makeField(8, 8),
  currentPlayer: Turn.PLAYER1,
  clickable: make2DArray(8, 8, false),
  gameOver: false,
});
export const fieldSettingsAtom = focusAtom(gameAtom, (optic) =>
  optic.prop('settings')
);
export const fieldAtom = focusAtom(gameAtom, (o) => o.prop('field'));
export const currentPlayerAtom = focusAtom(gameAtom, (o) =>
  o.prop('currentPlayer')
);
export const clickableTilesAtom = focusAtom(gameAtom, (o) =>
  o.prop('clickable')
);
export const gameOverAtom = focusAtom(gameAtom, (o) => o.prop('gameOver'));

export const shouldAllowClickAtom = atom<Record<Turn, boolean>>({
  [Turn.PLAYER1]: false,
  [Turn.PLAYER2]: false,
});

export const useResetGame = () => {
  const [_, setGame] = useAtom(gameAtom);

  return () => {
    setGame({
      settings: { width: 8, height: 8 },
      field: makeField(8, 8),
      currentPlayer: Turn.PLAYER1,
      clickable: make2DArray(8, 8, false),
      gameOver: false,
    });
  };
};
export const highScoreAtom = atom({ player1: 0, player2: 0 });

export const useScores = (): [number, number] => {
  const [_, sethighscore] = useAtom(highScoreAtom);
  const [gameOver] = useAtom(gameOverAtom);

  const scores = [0, 0] as [number, number];
  const [field] = useAtom(fieldAtom);
  for (const row of field) {
    for (const tile of row) {
      if (tile === TileState.PLAYER1) scores[0]++;
      if (tile === TileState.PLAYER2) scores[1]++;
    }
  }

  return scores;
};
