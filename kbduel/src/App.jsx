import { useEffect, useState } from "react";
import { useRef } from "react";
import "./App.css";


function App() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState([0,0]);
  const scoredRef = useRef(false);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat) return;
      if (!gameRunning && event.code === "Enter") {
        setGameRunning(true);
        setWinner(null);
        setLeftCount(0);
        setRightCount(0);
        scoredRef.current = false;
        return;
      }
      if (event.code === "KeyQ") {
        setLeftCount((prev) => {
          const next = prev + 1;
          if (next === 50 && !scoredRef.current) {
            scoredRef.current = true;
            setWinner("Player 1");
            setGameRunning(false);
            setScore((prev) => {return [prev[0]+1, prev[1]]});
          }
          return next;
        });
      }
      if (event.code === "KeyL") {
        setRightCount((prev) => {
          const next = prev + 1;
          if (next === 50 && !scoredRef.current) {
            scoredRef.current = true;
            setWinner("Player 2");
            setGameRunning(false);
            setScore((prev) => {return [prev[0], prev[1]+1]});
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

  
  if (!gameRunning && winner)
    return (
      <div className="min-w-screen min-h-screen bg-amber-50 flex justify-center items-center pb-10">
        <div className="flex flex-col">
        <h1 className="text-black font-thin -mt-40 mb-30">{winner} wins!</h1>
        <h1 className="text-black font-thin">
          Press 'Enter' to start new game
        </h1>
        </div>
      </div>
    );

  if (!gameRunning && !winner)
    return (
      <div className="min-w-screen min-h-screen bg-amber-50 flex justify-center items-center pb-10">
        <h1 className="text-black font-thin">
          Press 'Enter' to start new game
        </h1>
      </div>
    );


  if (gameRunning && !winner)
    return (
      <>
        <div className="flex min-w-screen min-h-screen gap-1 z-0">
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
        <div className="fixed top-6  right-150 left-150  z-50 text-amber-50 font-mono px-3 py-1 rounded text-6xl">
  <span>{score[0]} : {score[1]}</span>
</div>
      </>
    );
}

export default App;
