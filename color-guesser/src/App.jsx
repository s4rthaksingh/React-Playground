import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


function App() {
  const [colorsObject, setColorsObject] = useState({});
  const [color, setColor] = useState(0);

  useEffect(() => {
    const fetchColor = async () => {
      const response = await fetch('/colors.json');
      const result = await response.json();
      setColorsObject(result);
      setColor(Object.entries(result)[Math.floor(Math.random()*Object.entries(result).length)]);
    }
    fetchColor();
  },[])



  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-50 h-50 mb-30" style={{background : color[1]}}></div>
        <div className="flex flex-row gap-5">
          <button className="w-50 h-20">{color[0]}</button>
          <button className="w-50 h-20">{color[0]}</button>
          <button className="w-50 h-20">{color[0]}</button>
          <button className="w-50 h-20">{color[0]}</button>
        </div>
      </div>
    </>
  );
}

export default App;
