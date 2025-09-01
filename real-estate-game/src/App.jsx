import { useState } from "react";
import "./App.css";

function App() {
  const [bal, setBal] = useState(0);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-around">
        <Workplace setBal={setBal} bal={bal} />
      </div>
    </>
  );
}

function Workplace({ bal, setBal }) {
  return (
    <>
    <div className="flex flex-col gap-3">
      <h2>Your balance : {bal}</h2>
      <button
        onClick={() => {
          setBal(bal + 1);
        }}
      >
        Work
      </button>
    </div>
    </>
  );
}

export default App;
