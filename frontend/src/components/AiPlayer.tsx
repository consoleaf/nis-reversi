import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Coords } from '@reversi/types';
import { easyAiFindOptimalMove, proAiFindOptimalMove } from '@reversi/util/ai';
import { makeTurn } from '@reversi/util/makeTurn';
import { resetTimeouts } from '@reversi/util/resetTimeouts';
import { shuffleArray } from '@reversi/util/shuffleArray';
import {
  clickableTilesAtom,
  currentPlayerAtom,
  fieldAtom,
  TileState,
} from '@reversi/util/state';
import { useAtom } from 'jotai';
import { random } from 'lodash';
import cloneDeep from 'lodash.clonedeep';
import { Turn } from '../util';

export interface AiPlayerProps {
  level: 'easy' | 'pro';
  player: Turn;
}

export const AiPlayer = ({ level, player }: AiPlayerProps) => {
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom);
  const [_, setField] = useAtom(fieldAtom);
  const [clickableTiles] = useAtom(clickableTilesAtom);

  const color = useMemo(
    () => (player === Turn.PLAYER1 ? TileState.PLAYER1 : TileState.PLAYER2),
    [player]
  );

  const [canMove, setCanMove] = useState(false);
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const can = currentPlayer === player;
    if (can) {
      timeouts.push(setTimeout(() => setCanMove(can), 300));
    } else {
      setCanMove(can);
    }
    return () => resetTimeouts(timeouts);
  }, [currentPlayer]);

  useEffect(() => {
    if (!canMove) return;
    const clickable: Coords[] = [];
    for (let y = 0; y < clickableTiles.length; y++) {
      for (let x = 0; x < clickableTiles[y].length; x++) {
        if (clickableTiles[y][x]) clickable.push({ x, y });
      }
    }
    if (clickable.length === 0) return;
    shuffleArray(clickable);
    setField((field) => {
      const move =
        level === 'easy'
          ? easyAiFindOptimalMove(field, clickable, color)[0]
          : proAiFindOptimalMove(field, clickable, color);
      return makeTurn(field, player, move);
    });
    setCurrentPlayer(player === Turn.PLAYER1 ? Turn.PLAYER2 : Turn.PLAYER1);
    setCanMove(false);
  }, [canMove, setField, setCurrentPlayer, clickableTiles]);

  return <></>;
};
