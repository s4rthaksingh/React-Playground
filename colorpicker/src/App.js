import './App.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState("#000000");
  const [copySuccess, setCopySuccess] = useState(null);
  function copyToClipboard(){
    navigator.clipboard.writeText(color);
    setCopySuccess("Successfully copied to clipboard!");
  }
  return (
    <>
    <h4>{copySuccess}</h4>
    <h2>{color}</h2>
    <div><input type="color" name="" id="" onChange={(e) => {setColor(e.target.value); setCopySuccess(null)}}/></div>
    <button onClick={copyToClipboard}>Copy</button>
    </>
  );
}

export default App;
