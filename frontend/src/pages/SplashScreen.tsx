import { Box, Button, Text } from '@chakra-ui/react';
import { Typography } from '@reversi/components/Typography';
import { highScoreAtom } from '@reversi/util/state';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

const SplashScreen = () => {
  const { player1, player2 } = useAtom(highScoreAtom);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexGrow="1"
      gap="5"
    >
      <Typography fontSize="4xl">Pick your mode:</Typography>
      <Box display="flex" flexDirection="column" alignItems="stretch" gap="2">
        <Button as={Link} to="/easy" size="lg">
          Player VS Easy AI
        </Button>
        <Button as={Link} to="/hard" size="lg">
          Player VS Hard AI
        </Button>
        <Button as={Link} to="/vs" size="lg">
          Player VS Player
        </Button>
        <Button as={Link} to="/ai" size="lg">
          AI VS AI
        </Button>
        <Button as={Link} to="/spectate" size="lg">
          Spectate
        </Button>
      </Box>
      <Box>
        <Typography>Player1 highscore: {player1}</Typography>
        <Typography>Player2 highscore: {player2}</Typography>
      </Box>
    </Box>
  );
};

export default SplashScreen;
