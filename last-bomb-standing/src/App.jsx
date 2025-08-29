import { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../firebase';
import './App.css';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  useEffect(() => {
    const playerRef = ref(db, 'game/currentPlayer');
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Current Player:', data);
      setCurrentPlayer(data);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    set(ref(db, 'game/currentPlayer'), { name: 'Alice' });
  };

  return (
    <div>
      <h1>Hot Bomb Game</h1>
      <p>Current Player: {currentPlayer ? currentPlayer.name : 'Loading...'}</p>
      <button onClick={handleClick}>Click to Set Player</button>
    </div>
  );
}

export default App;