import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


function App() {
  const [resultmessage, setResultMessage] = useState(null);
  const [colors, setColors] = useState({});
  const [color, setColor] = useState(0);

  useEffect(() => {
    const fetchColor = async () => {
      const response = await fetch('/colors.json');
      const result = await response.json();
      setColors(Object.entries(result));
      setColor(Object.entries(result)[Math.floor(Math.random()*Object.entries(result).length)]);
    }
    fetchColor();
  },[])

  if (!color || Object.keys(colors).length === 0) {
    return <div>Loading...</div>;
  }


  let options = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random()*colors.length);
    if(options.includes(randomIndex)) i--;
    else options[i] = randomIndex;
  }

  const selectedOption = Math.floor(Math.random()*3);

  function checkAnswer(answer){
    if(answer == selectedOption) setResultMessage("You answered correct!");
    else setResultMessage("You answered wrong!");
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-50 h-50 mb-30" style={{backgroundColor : colors[options[selectedOption]][1]}}></div>
        <div className="flex flex-row gap-5">
          <button className="w-50 h-20" onClick={() => checkAnswer(0)}>{colors[options[0]][0]}</button>
          <button className="w-50 h-20" onClick={() => checkAnswer(1)}>{colors[options[1]][0]}</button>
          <button className="w-50 h-20" onClick={() => checkAnswer(2)}>{colors[options[2]][0]}</button>
          <button className="w-50 h-20" onClick={() => checkAnswer(3)}>{colors[options[3]][0]}</button>
        </div>
        <h3 className="mt-15">{resultmessage}</h3>
      </div>
    </>
  );
}

export default App;
