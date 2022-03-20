import { BrowserRouter, Router } from 'react-router-dom';
import './assets/App.css';
import { AiPlayer } from './components/AiPlayer';
import { GameField } from './components/GameField';
import { HumanPlayer } from './components/HumanPlayer';
import { TurnController } from './components/TurnController';
import { ClickableTilesController } from './hooks/useIsClickable';
import { Routes } from './router';
import { Turn } from './util';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );

  /* return (
   *   <Page>
   *     <GameField height={8} width={8} />
   *     <ClickableTilesController />
   *     <TurnController />
   *     <HumanPlayer player={Turn.PLAYER1} />
*     <AiPlayer level="easy" player={Turn.PLAYER2} />
*     <AiPlayer level="pro" player={Turn.PLAYER1} />
*   </Page> 
  );
*/
}

export default App;
