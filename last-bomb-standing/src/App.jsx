import { useState, useEffect, useRef } from 'react';
import { ref, set, onValue, off, update, get } from 'firebase/database';
import { db } from '../firebase';
import './App.css';

function App() {
  const [currentPlayer, setcurrentPlayer] = useState(null);
  const [localPlayer, setLocalPlayer] = useState(0);
  const [gameState, setGameState] = useState(null);
  const hasAssignedPlayer = useRef(false);

  const gameRef = ref(db,'game')

  useEffect(() => {
    const unsubscribe = onValue(gameRef, (snapshot) => {
      let newGameState = snapshot.val();
      console.log(newGameState);
      if (!newGameState || typeof newGameState.currentPlayer === 'undefined' || typeof newGameState.players === 'undefined') {
        set(gameRef, { currentPlayer: 0 , players : []});
        console.log("Something was not defined, so i set the gameref"); 
        return;
      }

      let newLocalplayer = localPlayer
      while(newGameState.players.includes(newLocalplayer)){
        console.log(newGameState.players + " includes local player " + newLocalplayer);
        newLocalplayer++;
        console.log("Increased local player to " +   newLocalplayer);
      }
      
      setLocalPlayer(newLocalplayer);

      if(!hasAssignedPlayer.current && !newGameState.players.includes(newLocalplayer)){
        hasAssignedPlayer.current = true;
        const updatedPlayers = [...newGameState.players, newLocalplayer];
        update(gameRef, {players : updatedPlayers});
      }
      setGameState(newGameState);
      setcurrentPlayer(newGameState.currentPlayer);
    });

    return () => unsubscribe();
  }, []);

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