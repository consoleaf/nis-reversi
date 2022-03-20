import { ReactNode, useEffect } from 'react';
import { Box, Image } from '@chakra-ui/react';
import black_sprite from '@reversi/assets/black.png';
import white_sprite from '@reversi/assets/white.png';
import { GameField } from '@reversi/components/GameField';
import { TurnController } from '@reversi/components/TurnController';
import { Typography } from '@reversi/components/Typography';
import { ClickableTilesController } from '@reversi/hooks/useIsClickable';
import { ChildrenProps } from '@reversi/types';
import {
  currentPlayerAtom,
  gameOverAtom,
  useResetGame,
  useScores,
} from '@reversi/util/state';
import { useAtom } from 'jotai';
import { Turn } from '../util';

export interface GameProps {
  title: string;
  children: () => ReactNode;
}

const Game = ({ children, title }: GameProps) => {
  const reset = useResetGame();
  const [currentPlayer] = useAtom(currentPlayerAtom);

  useEffect(() => {
    return reset;
  }, []);

  const [gameOver] = useAtom(gameOverAtom);
  const [p1score, p2score] = useScores();

  return (
    <Box
      display="flex"
      flexGrow="1"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="flex-start"
      px={2}
    >
      <Box textAlign="center" p={3}>
        <Typography fontSize="2xl">{title}</Typography>
      </Box>
      <Box
        flexGrow="1"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        px={{ md: 10 }}
        gap={2}
      >
        <Box
          p={5}
          boxShadow="0px 0px 6px 0px rgba(0,0,0,0.75)"
          background="primary.500"
          borderRadius={25}
        >
          <GameField height={8} width={8} />
          <ClickableTilesController />
          <TurnController />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          p={5}
          minWidth="20em"
          gap={5}
          boxShadow="0px 0px 6px 0px rgba(0,0,0,0.75)"
          background="primary.500"
          borderRadius={25}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize="2xl">Now playing:</Typography>
            <Image
              maxWidth="5em"
              src={currentPlayer === Turn.PLAYER1 ? black_sprite : white_sprite}
            />
          </Box>
          <Box>
            <Typography fontSize="2xl">Scores:</Typography>
            <Typography fontSize="2xl" color="black">
              Player 1: {p1score}
            </Typography>
            <Typography fontSize="2xl" color="white">
              Player 2: {p2score}
            </Typography>
          </Box>
          {gameOver && (
            <>
              <Typography fontSize="xl">Game over!</Typography>
            </>
          )}
          {children()}
        </Box>
      </Box>
    </Box>
  );
};

export default Game;
