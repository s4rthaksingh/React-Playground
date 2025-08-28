import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [leftCount, setLeftCount] = useState(45);
  const [rightCount, setRightCount] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameRunning || event.repeat) return;
      if (event.code === "KeyQ") {
        setLeftCount((prev) => {
          const next = prev + 1;
          if (next >= 50) {
            setWinner("Player 1");
            setGameRunning(false);
          }
          return next;
        });
      }
      if (event.code === "KeyL") {
        setRightCount((prev) => {
          const next = prev + 1;
          if (next >= 50) {
            setWinner("Player  1");
            setGameRunning(false);
          }
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameRunning]);

  return (
    <>
      <div className="flex min-w-screen min-h-screen gap-1">
        <div className="bg-red-300 w-1/2">
          <h1 className="text-black mt-6 font-thin flex items-center justify-center">
            Player 1
          </h1>
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
