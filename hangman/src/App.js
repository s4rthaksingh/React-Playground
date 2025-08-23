import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [chances, setChances] = useState(6);
  const [word, setWord] = useState(null)
  const [loading, setLoading] = useState(false)
  function GetNewWord(){
      setLoading(true)
      const fetchnewword = async () => {
        const response = await fetch(
          "/movies.json"
        );
        const result = await response.json();
        setWord(result[Math.floor(Math.random() * (result.length - 0 + 1)) + 0]);
        setChances(6);
        setLoading(false)
      };
      fetchnewword();
  }
  
  useEffect(()=>
  GetNewWord(),[])

  return (
    <>
      <img
        src={require(`../public/images/Hangman-${chances}.png`)}
        alt="hangman.png"
      />
      <div><strong>{chances}</strong> chances remaining</div>
      {loading?<div>Loading...</div> : chances > 0 && word? (
        <div><Wordspace key={word} word={word} setChances={setChances} chances={chances} /><button onClick={GetNewWord}>New Movie</button></div>
      ) : (
        <div>
          Game Over <br />
          The movie was {word} <br />
          <button
            onClick={GetNewWord}
          >
            Try again?
          </button>
        </div>
      )}
    </>
  );
}

function Wordspace({ word, setChances, chances }) {
  const toguess = word.split("");
  const [currentChar, setCurrentChar] = useState("");
  const [currentWord, setCurrentWord] = useState(() => 
    toguess.map((char) => 
      ['a','e','i','o','u',' ',':','-','.'].includes(char) ? char : '_'
    )
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (currentChar === "" || currentChar === " ") return;
    if (word.toLowerCase().includes(currentChar)) {
      let newCurrentWord = [...currentWord];
      for (let i = 0; i < toguess.length; i++) {
        if (toguess[i].toLowerCase() === currentChar.toLowerCase()) {
          newCurrentWord[i] = toguess[i];
        }
      }
      setCurrentWord(newCurrentWord);
    } else setChances(chances - 1);
    setCurrentChar("");
  }
  return (
    <>
      <h3>{currentWord.map((char, index) => {
        return <span key={index}>{char===' '?'\u00A0\u00A0':char} </span>;
      })}</h3>

      {word!==currentWord.join('') ? <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="charInput">Guess a single letter : </label>
        <input
          type="text"
          maxLength="1"
          id="charInput"
          onChange={(e) => setCurrentChar(e.target.value)}
          value={currentChar.toLowerCase()}
        />
        <button type="submit">Try</button>
      </form>:<div>You guessed it right!</div>}
    </>
  );
}

export default App;
