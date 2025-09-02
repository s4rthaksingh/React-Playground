import { useState, useEffect, useRef } from 'react';
import { ref, set, onValue, off, update, get, push } from 'firebase/database';
import { db } from '../firebase';
import './App.css';

function App() {
  const [currentPlayer, setcurrentPlayer] = useState(null);
  const [localPlayer, setLocalPlayer] = useState(null);
  const [gameState, setGameState] = useState(null);

  const gameRef = ref(db,'game')

  useEffect(() => {
    const storedID = localStorage.getItem('playerID');
    if(storedID) setLocalPlayer(parseInt(storedID));
    const unsubscribe = onValue(gameRef, (snapshot) => {
      let newGameState = snapshot.val();
      if(!newGameState.players) return update(gameRef, {'players':[0]});
      if(newGameState.players && !localStorage.getItem('playerID')) {
        const newLocalPlayer = Object.keys(newGameState.players).length;
        setLocalPlayer(newLocalPlayer);
        localStorage.setItem("playerID", newLocalPlayer);
        update(gameRef, {[`players/${newLocalPlayer}`] : newLocalPlayer})
      }
      setGameState(newGameState);
      setcurrentPlayer(newGameState.currentPlayer);
    });

    return () => {unsubscribe();}
  }, []);

  const handleClick = (to) => {
    update(gameRef, {currentPlayer : parseInt(to)});
  }

  return (
    <> 
      <h1>You are {localPlayer}</h1>
      {localPlayer === currentPlayer && <h1>💣</h1>}
      <p>Current Player: {currentPlayer + 1}</p>
        {gameState &&
          Object.keys(gameState.players).map(player =>
            {return <button key={player} onClick={() => handleClick(player)}>Give it to Player {parseInt(player)+1}</button>}
          )
        }
    </>
  );
}

export default App;