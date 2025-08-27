import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-amber-600 w-50 h-50 mb-30"></div>
        <div className="flex flex-row gap-5">
          <button className="w-50 h-20">A</button>
          <button className="w-50 h-20">B</button>
          <button className="w-50 h-20">C</button>
          <button className="w-50 h-20">D</button>
        </div>
      </div>
    </>
  );
}

export default App;
