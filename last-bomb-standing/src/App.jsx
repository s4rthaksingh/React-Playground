import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    socket.on("state", setState);
    return () => socket.off("state");
  }, []);

  if (state)
    return (
      <div>
        <h1>{state.bombHolder === socket.id && "💣"}</h1>
        {state.bombHolder === socket.id &&
          state.players.map((player) => {
            if (player !== socket.id)
              return <button key={player}>Give bomb to {player}</button>;
          })}
        <p>{state && JSON.stringify(state)}</p>
      </div>
    );
}
