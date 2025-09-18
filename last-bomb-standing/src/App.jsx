import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    socket.on("state", setState);
    return () => socket.off("state");
  }, []);

  function giveBomb(player) {
    socket.emit("giveBomb", player)
  }

  if (state)
    return (
      <div>
        <h1>{state.bombHolder === socket.id && "💣"}</h1>
        {state.bombHolder === socket.id &&
          state.players.map((player) => {
            if (player !== socket.id)
              return <button key={player} onClick={() => giveBomb(player)}>Give bomb to {player}</button>;
          })}
        <p>{state && JSON.stringify(state)}</p>
      </div>
    );
}
