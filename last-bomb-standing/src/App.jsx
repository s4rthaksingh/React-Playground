import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [state, setState] = useState(null);
  

  useEffect(() => {
    socket.on("state", setState);
    return () => socket.off("state");
  }, []);

  return(
    <p>{state && JSON.stringify(state)}</p>
  );
}