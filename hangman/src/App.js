import { useState } from "react";
import "./App.css";

function App() {
  const [chances, setChances] = useState(6);
  return (
    <>
      <img src={require(`../public/images/Hangman-${chances}.png`)} alt="hangman.png" />
      <div>{chances} chances remaining</div>
      {chances>0?<Wordspace word="Sarthak" setChances={setChances} chances={chances}/>:"Game Over"}

    </>
  );
}

function Wordspace({word, setChances, chances}){
  const toguess = word.split("");
  const [currentChar, setCurrentChar] = useState("");
  const [currentWord, setCurrentWord] = useState(("_".repeat(toguess.length)).split(""))
  function handleSubmit(e){
    e.preventDefault();
    if(currentChar === "" || currentChar === " ") return;
    if(toguess.includes(currentChar)){
      let newCurrentWord = [...currentWord]
      for (let i = 0; i < toguess.length; i++) {
        if(toguess[i] === currentChar){
          
          newCurrentWord[i] = currentChar
          
        }
      }
      setCurrentWord(newCurrentWord);
    }
    else setChances(chances-1)
    setCurrentChar("");
  }
  return (
    <>
  
      {currentWord.map((char) => {
        return <span>{char}{" "}</span>
      })}
    
      <form onSubmit={e=>handleSubmit(e)}>
        <label htmlFor="charInput">Guess a single letter : {" "}</label>
        <input type="text" maxLength="1" id="charInput" onChange={e => setCurrentChar(e.target.value)} value={currentChar}/>
        <button type="submit">Try</button>
      </form>
    </>
  )
}

export default App;
