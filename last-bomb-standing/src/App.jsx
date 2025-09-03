import { useState, useEffect, useRef } from 'react';
import { ref, set, onValue, off, update, get, push } from 'firebase/database';
import { db } from '../firebase';
import './App.css';

function App() {
  const [currentPlayer, setcurrentPlayer] = useState(null);
  const [localPlayer, setLocalPlayer] = useState(null);
  const [gameState, setGameState] = useState(null);
  const hasAssignedRef = useRef(false);

  const gameRef = ref(db,'game')

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
  
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'f5' || (e.ctrlKey && key === 'r') || (e.metaKey && key === 'r')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onValue(gameRef, (snapshot) => {
      let newGameState = snapshot.val();
      if(!newGameState.players) {setLocalPlayer(0) ;hasAssignedRef.current = true; return update(gameRef, {'players':[0]})};
      if(!hasAssignedRef.current && localPlayer === null) {
        const newLocalPlayer = Object.keys(newGameState.players).length;
        hasAssignedRef.current = true;
        setLocalPlayer(newLocalPlayer);
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
      <p>Current Player: {currentPlayer}</p>
        {gameState && currentPlayer===localPlayer &&
          Object.keys(gameState.players).map(player =>
            {if (!(parseInt(player) === localPlayer)) return <button key={player} onClick={() => handleClick(player)}>Give it to Player {parseInt(player)}</button>}
          )
        }
    </>
  );
}

export default App;