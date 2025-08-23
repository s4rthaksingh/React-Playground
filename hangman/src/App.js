import { useState } from "react";
import "./App.css";

function App() {
  const [chances, setChances] = useState(6);
  return (
    <>
      <img src={require(`../public/images/Hangman-${chances}.png`)} alt="hangman.png" />
      <div>{chances} chances remaining</div>
    </>
  );
}

export default App;
