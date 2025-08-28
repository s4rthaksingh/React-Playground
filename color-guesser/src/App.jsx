import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [resultmessage, setResultMessage] = useState(null);
  const [colors, setColors] = useState({});
  const [color, setColor] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    const fetchColor = async () => {
      const response = await fetch("/colors.json");
      const result = await response.json();
      setColors(Object.entries(result));
    };
    fetchColor();
  }, []);


  useEffect(() => {
    if(!colors.length > 0) return;
    let newoptions = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      if (newoptions.includes(randomIndex)) i--;
      else newoptions[i] = randomIndex;
    }

    setOptions(newoptions);

    setSelectedOption(Math.floor(Math.random() * 3));
  }, [colors]);

  useEffect(() => {
    if (options.length > 0 && colors.length > 0 && selectedOption !== undefined) {
      setColor(colors[options[selectedOption]]);
    }
  }, [options, selectedOption, colors]);

  function checkAnswer(answer) {
    if (answer == selectedOption) return true;
    else return false;
  }

  if (!color || Object.keys(colors).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="w-50 h-50 mb-30"
          style={{ backgroundColor: color[1] }}
        ></div>
        <div className="flex flex-row gap-5">
          <button className="w-50 h-20" onClick={() => checkAnswer(0)}>
            {colors[options[0]][0]}
          </button>
          <button className="w-50 h-20" onClick={() => checkAnswer(1)}>
            {colors[options[1]][0]}
          </button>
          <button className="w-50 h-20" onClick={() => checkAnswer(2)}>
            {colors[options[2]][0]}
          </button>
          <button className="w-50 h-20" onClick={() => checkAnswer(3)}>
            {colors[options[3]][0]}
          </button>
        </div>
        <p className="mt-15">{resultmessage}</p>
      </div>
    </>
  );
}

export default App;
