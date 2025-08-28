import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0)

  return (
    <>
      <div className="flex min-w-screen min-h-screen gap-1">
        <div className="bg-red-300 w-1/2">
          <h1 className="text-black mt-6 font-thin flex items-center justify-center">Player 1</h1>
            <div className="flex items-center justify-center h-full text-black  font-thin">
              <h1 className="text-3xl mb-50">{leftCount}</h1>
            </div>
        </div>
        <div className="bg-blue-300 w-1/2">
          <h1 className="text-black mt-6 font-thin">Player 2</h1>
            <div className="flex items-center justify-center h-full text-black  font-thin">
              <h1 className="text-3xl mb-50">{rightCount}</h1>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
