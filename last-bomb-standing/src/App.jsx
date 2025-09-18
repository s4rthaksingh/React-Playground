import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [state, setState] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on("state", setState);
    return () => socket.off("state");
  }, []);

  function giveBomb(player) {
    socket.emit("giveBomb", player)
  }

  function handleJoinGame(){
    if(state && state.players.some(p => p.name === playerName)) {
      setError("This player already exists");
      return;
    }
    socket.emit("joinGame", playerName.trim());
    setHasJoined(true);
  }

  if(!hasJoined) return(
    <div>
      <h1>Enter a username :</h1>
      <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}/> <br />
      <button onClick={handleJoinGame} disabled={!playerName.trim()}>Join</button>
    </div>
  )

  if (state)
    return (
      <div>
        <h1>{state.leader === socket.id && "You are the leader"}</h1>
        <h1>{state.bombHolder === socket.id && "💣"}</h1>
        {state.bombHolder === socket.id &&
          state.players.filter(player => player.id !== socket.id).map((player) => {
              return <button key={player.id} onClick={() => giveBomb(player.id)}>Give bomb to {player.name}</button>;
          })}
        <p>{state && JSON.stringify(state)}</p>
      </div>
    );
}
