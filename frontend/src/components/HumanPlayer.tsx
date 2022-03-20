import { useEffect } from 'react';
import { currentPlayerAtom, shouldAllowClickAtom } from '@reversi/util/state';
import { useAtom } from 'jotai';
import { Turn } from '../util';

export interface HumanPlayerProps {
  player: Turn;
}

export const HumanPlayer = ({ player }: HumanPlayerProps) => {
  const [currentPlayer] = useAtom(currentPlayerAtom);
  const [_, setShouldAllowClick] = useAtom(shouldAllowClickAtom);

  useEffect(() => {
    setShouldAllowClick((x) => ({ ...x, [player]: player === currentPlayer }));
    return () =>
      setShouldAllowClick((x) => ({
        ...x,
        [player]: player !== currentPlayer,
      }));
  }, [currentPlayer, player]);

  return <></>;
};
