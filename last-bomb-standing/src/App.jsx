import { useState, useEffect } from 'react';
import { ref, set, onValue, off, update } from 'firebase/database';
import { db } from '../firebase';
import './App.css';

function App() {
  const [playerIndex, setplayerIndex] = useState(null);
  const [localPlayer, setLocalPlayer] = useState(0);
  const [addedToPlayers, setAddedToPlayers] = useState(false);

  useEffect(() => {  

    const gameRef = ref(db, 'game');
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Current game state:', data);
      setplayerIndex(data.playerIndex);
      if(!data.players){
        update(gameRef,{ players: [localPlayer] })
        setAddedToPlayers(true);
      }
      if(data.players && data.players.includes(localPlayer) && !addedToPlayers){
        setLocalPlayer(localPlayer+1);
        update(gameRef, {players : []})
        console.log("Local player : " + localPlayer);
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);

  const handleClick = (player) => {
    set(ref(db, 'game'), { playerIndex: player });
  };

  return (
    <div> 
      {localPlayer === playerIndex && <h1>💣</h1>}
      <p>Current Player: {playerIndex}</p>
      <div className="flex gap-5">
        <button onClick={() => handleClick(0)}>Give it to Player 1</button>
        <button onClick={() => handleClick(1)}>Give it to Player 2</button>
      </div>
    </div>
  );
}

export default App;