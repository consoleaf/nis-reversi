import { Box } from '@chakra-ui/react';
import { AiPlayer } from '@reversi/components/AiPlayer';
import { HumanPlayer } from '@reversi/components/HumanPlayer';
import { Game, SplashScreen } from '@reversi/pages';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { Page } from '../components/Page';
import { Turn } from '../util';

export const Routes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Page />,
      children: [
        {
          index: true,
          element: <SplashScreen />,
        },
        {
          path: 'easy',
          element: (
            <Game title="Player VS Easy AI">
              {() => (
                <>
                  <HumanPlayer player={Turn.PLAYER1} />
                  <AiPlayer level="easy" player={Turn.PLAYER2} />
                </>
              )}
            </Game>
          ),
        },
        {
          path: 'hard',
          element: (
            <Game title="Player VS Hard AI">
              {() => (
                <>
                  <HumanPlayer player={Turn.PLAYER1} />
                  <AiPlayer level="pro" player={Turn.PLAYER2} />
                </>
              )}
            </Game>
          ),
        },
        {
          path: 'vs',
          element: (
            <Game title="Player VS Player">
              {() => (
                <>
                  <HumanPlayer player={Turn.PLAYER1} />
                  <HumanPlayer player={Turn.PLAYER2} />
                </>
              )}
            </Game>
          ),
        },
        {
          path: 'ai',
          element: (
            <Game title="AI VS AI">
              {() => (
                <>
                  <AiPlayer level="easy" player={Turn.PLAYER1} />
                  <AiPlayer level="easy" player={Turn.PLAYER2} />
                </>
              )}
            </Game>
          ),
        },
      ],
    },
  ];

  const routesElement = useRoutes(routes);

  return routesElement;
};
