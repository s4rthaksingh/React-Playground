import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gameRunning, setGameRunning] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key);
      if (gameRunning) {
        if (e.key === "q") {
          setWinner("Player 1");
          setGameRunning(false);
        }
        if (e.key === "l") {
          setWinner("Player 2");
          setGameRunning(false);
        }
      }
      if (e.key === "Enter" && !gameRunning) {
        setWinner(null);
        document.getElementById("gameOverText").textContent = "Game will start randomly";
        setTimeout(() => {
          setGameRunning(true)
        }, Math.floor(Math.random() * 9001) + 1000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },[gameRunning]);

  if (gameRunning)
    return (
      <>
        <div className="flex h-screen w-screen text-[#38302E]">
          <div className="w-1/2 bg-[#b6d7b9] font-thin">
            <h1 className="mt-4">Player 1</h1>
            {winner === "Player 1" && <h1>Winner</h1>}
            <div className="flex h-full items-center justify-center">
              <h1 className="mb-50 ">Press Q</h1>
            </div>
          </div>
          <div className="w-1/2 bg-[#9ABD97] font-thin">
            <h1 className="mt-4">Player 2</h1>
            {winner === "Player 2" && <h1>Winner</h1>}
            <div className="flex h-full items-center justify-center">
              <h1 className="mb-50 ">Press L</h1>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className="h-screen w-screen flex flex-col gap-40 items-center justify-center font-thin text-gray-950 bg-[#6F6866]">
      {winner && <h1 id="winnerText">{winner} wins!</h1>}
      <h1 className="text-9xl mb-15" id="gameOverText">Press enter to restart</h1>
    </div>
  );
}

export default App;
