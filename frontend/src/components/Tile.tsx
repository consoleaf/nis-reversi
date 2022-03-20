import { useRef, useEffect, useState } from 'react';
import { Box, Image, Circle } from '@chakra-ui/react';
import sprite_falling_black from '@reversi/assets/reversi-piece-falling-black.png';
import sprite_falling_white from '@reversi/assets/reversi-piece-falling-white.png';
import sprite_switch_reverse from '@reversi/assets/reversi-piece-packed-reverse.png';
import sprite_switch from '@reversi/assets/reversi-piece-packed.png';
import spacer from '@reversi/assets/spacer.png';
import { useGameTile } from '@reversi/hooks/useGameTile';
import { useIsClickable } from '@reversi/hooks/useIsClickable';
import {
  currentPlayerAtom,
  shouldAllowClickAtom,
  TileState,
} from '@reversi/util/state';
import { useAtom } from 'jotai';

export interface TileProps {
  x: number;
  y: number;
}

export const Tile = ({ x, y }: TileProps) => {
  const { state, onClick } = useGameTile(x, y);

  const [shouldAllowClick] = useAtom(shouldAllowClickAtom);
  const [currentPlayer] = useAtom(currentPlayerAtom);
  const [className, setClassName] = useState('sprite');
  const [src, setSrc] = useState(sprite_falling_black);

  const prevStateRef = useRef<TileState | null>(null);
  useEffect(() => {
    prevStateRef.current = null;
  }, [x, y]);
  useEffect(() => {
    if (state === prevStateRef.current) return;
    const prev = prevStateRef.current;
    prevStateRef.current = state;

    // State changed
    if (prev === TileState.EMPTY || prev === null) {
      const className = 'sprite transition';
      if (state === TileState.PLAYER1) {
        setClassName('sprite');
        setSrc(sprite_falling_black);
        setTimeout(() => setClassName(`${className} s19`), 10);
      }
      if (state === TileState.PLAYER2) {
        setClassName('sprite');
        setSrc(sprite_falling_white);
        setTimeout(() => setClassName(`${className} s19`), 10);
      }
    } else {
      if (state === TileState.PLAYER1) {
        setSrc(sprite_switch_reverse);
        setClassName('sprite');
        setTimeout(() => setClassName(`${className} s19`), 10);
      }
      if (state === TileState.PLAYER2) {
        setSrc(sprite_switch);
        setClassName('sprite');
        setTimeout(() => setClassName(`${className} s19`), 10);
      }
    }

    if (state === TileState.EMPTY) {
      setSrc(sprite_falling_black);
      setClassName('sprite');
    }
  }, [state]);

  const isClickable = useIsClickable(x, y) && shouldAllowClick[currentPlayer];

  return (
    <Box className={'stretchy'}>
      <Image src={spacer} className={'spacer'} opacity={0} />
      <Image src={src} className={className} />
      {isClickable && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'full',
            height: 'full',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Circle
            onClick={onClick}
            size="50%"
            background="#e29200d4"
            cursor="pointer"
          />
        </Box>
      )}
    </Box>
  );
};
