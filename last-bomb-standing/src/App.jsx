import { useState, useEffect } from 'react';
import { ref, set, onValue, off, update } from 'firebase/database';
import { db } from '../firebase';
import './App.css';

function App() {
  const [currentPlayer, setcurrentPlayer] = useState(null);
  const [localPlayer, setLocalPlayer] = useState(0);
  const [gameState, setGameState] = useState(null);
  const [isLocalPlayerSet, setIsLocalPlayerSet] = useState(false);

  const gameRef = ref(db,'game')

  useEffect(()=>{
    const unsubscribe = onValue(gameRef, (snapshot) => {
      let newGameState = snapshot.val();
      if (!newGameState) {
        update(gameRef, { currentPlayer: 0 });
        return;
      }
      setGameState(newGameState);
      if(newGameState.currentPlayer === localPlayer && !isLocalPlayerSet){ setIsLocalPlayerSet(true); setLocalPlayer(1)};
      
      setcurrentPlayer(newGameState.currentPlayer);
    })

    return(() => unsubscribe());
  }, [])

  const handleClick = (to) => {
    update(gameRef, {currentPlayer : to});
  }

  return (
    <> 
      {localPlayer === currentPlayer && <h1>💣</h1>}
      <p>Current Player: {currentPlayer}</p>
        <button onClick={() => handleClick(0)}>Give it to Player 1</button>
        <button onClick={() => handleClick(1)}>Give it to Player 2</button>
    </>
  );
}

export default App;