import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {
  clickableTilesAtom,
  currentPlayerAtom,
  fieldAtom,
  gameOverAtom,
} from '@reversi/util/state';
import { useAtom } from 'jotai';
import { Turn } from '../util';

function hasTrue(tiles: boolean[][]): boolean {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j]) {
        return true;
      }
    }
  }
  return false;
}

export const TurnController = () => {
  const [clickableTiles] = useAtom(clickableTilesAtom);
  const [field] = useAtom(fieldAtom);
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom);
  const toast = useToast({ duration: 2000 });

  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  const [prevPlayerHadMoves, setPrevPlayerHadMoves] = useState(true);

  useEffect(() => {
    setPrevPlayerHadMoves(true);
  }, [field]);

  useEffect(() => {
    if (gameOver) return;
    let hasLegalMoves = hasTrue(clickableTiles);
    if (!hasLegalMoves) {
      toast({
        title: `Player ${currentPlayer} has no moves!`,
        description: 'Skipping turn...',
      });

      if (!prevPlayerHadMoves) {
        setGameOver(true);
        toast({ title: 'Game over!' });
      } else {
        setCurrentPlayer(
          currentPlayer === Turn.PLAYER1 ? Turn.PLAYER2 : Turn.PLAYER1
        );
      }
    }
    setPrevPlayerHadMoves(hasLegalMoves);
  }, [clickableTiles, currentPlayer, setCurrentPlayer]);

  return <></>;
};
