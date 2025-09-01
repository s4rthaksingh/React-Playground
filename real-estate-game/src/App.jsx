import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bal, setBal] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseFloat(saved) : 0.0;
  });

  useEffect(() => {
    localStorage.setItem("balance", bal.toString());
  },[bal])

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-around">
        <Workplace setBal={setBal} bal={bal} />
        <Properties setBal={setBal} bal={bal} />
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

function Properties({bal, setBal}){

  const buyApartmentHandler = () => {
    setBal(bal-100);
  }

  if(bal >= 100) return <>
    <button onClick={buyApartmentHandler}>Buy apartment ($100)</button>
  </>
}

export default App;
