import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import sprite_falling_black from '@reversi/assets/reversi-piece-falling-black.png';
import sprite_falling_white from '@reversi/assets/reversi-piece-falling-white.png';
import sprite_switch_reverse from '@reversi/assets/reversi-piece-packed-reverse.png';
import sprite_switch from '@reversi/assets/reversi-piece-packed.png';
import { currentPlayerAtom, fieldAtom } from '@reversi/util/state';
import { useAtom } from 'jotai';
import { Tile } from './Tile';

export interface GameFieldProps {
  height: number;
  width: number;
}

export const GameField = ({ height, width }: GameFieldProps) => {
  const [field, setField] = useAtom(fieldAtom);
  const [currentPlayer] = useAtom(currentPlayerAtom);

  // Preload sprites
  useEffect(() => {
    [
      sprite_falling_black,
      sprite_falling_white,
      sprite_switch,
      sprite_switch_reverse,
    ].map((pic) => {
      const img = new Image();
      img.src = pic;
    });
  }, []);

  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      {field.map((row, y) => (
        <Box key={y} display="flex" flexDirection="column">
          {row.map((cell, x) => (
            <Tile key={x} x={x} y={y} />
          ))}
        </Box>
      ))}
    </Box>
  );
};
