export const neighbors: [number, number][] = [];
for (let i = -1; i <= 1; i++)
  for (let j = -1; j <= 1; j++)
    if (!(i === 0 && j === 0)) neighbors.push([i, j]);

export enum Turn {
  PLAYER1 = 'player1',
  PLAYER2 = 'player2',
}
