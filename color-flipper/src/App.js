import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";




function App() {
  const [color, setColor] = useState("white");
  const randomColor = () => {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    setColor(`#${hex}`);
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color])
  return (
    <div className="App" style={{textAlign:"center", paddingTop:"50px"}}>
      <h1>Background color : {color}</h1>
      <button
        onClick={randomColor}>
        Change color
      </button>
    </div>
  );
}

export default App;
