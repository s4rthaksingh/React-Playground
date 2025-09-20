import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [state, setState] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(null);

  const leaderName = state?.players.find(p => p.id === state.leader)?.name;

  function findPlayerNamebyID(id) {
    const player = state.players.find(p => p.id === id);
    return player? player.name : "Unknown";
  }

  useEffect(() => {
    socket.on("state", setState);
    return () => socket.off("state", state);
  }, []);

  function giveBomb(player) {
    socket.emit("giveBomb", player)
  }

  function handleJoinGame(){
    if(state.players.some(p => p.name === playerName)) {
      setError("This player already exists");
      return;
    }
    else{
      socket.emit("joinGame", playerName.trim());
      setHasJoined(true);
    }
  }

  if(!hasJoined) return(
    <div>
      <h1>Enter a username :</h1>
      <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}/> <br />
      <button onClick={handleJoinGame} disabled={!state || !playerName.trim()}>Join</button>
      {error&&error}
    </div>
  )

  if(state && !state.gameActive && state.leader === socket.id) return(
    <div>
      <h1>You are the leader</h1>
      <button onClick={() => socket.emit("startGame")}>Start game</button>
      {JSON.stringify(state)}
    </div>
  )
  
  else if (state && !state.gameActive){
    return(
      <div><h1>Waiting for {leaderName} to start the game...</h1>{JSON.stringify(state)}</div>
      
    )}

  else if (state && state.gameActive)
    return (
      <div>
        <h1>{state.leader === socket.id && "You are the leader"}</h1>
        <h1>{state.bombHolder === socket.id && "💣"}</h1>
        {state.bombHolder === socket.id && !state.loser &&
          state.players.filter(player => player.id !== socket.id).map((player) => {
              return <button key={player.id} onClick={() => giveBomb(player.id)}>Give bomb to {player.name}</button>;
          })}
        <p>{state && JSON.stringify(state)}</p>
        {state.loser && <h1>{findPlayerNamebyID(state.loser)} EXPLODED !!</h1>}
      </div>
    );
}
