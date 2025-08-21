import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(0);
  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <Counter count={count} increment={increment} />
      <h2>Custom count</h2>
      <ChangeCount count={count} setCount={setCount} delta={delta} setDelta={setDelta}/>
    </>
  );
}

function Counter({ count, increment }) {
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>Click me!</button>
    </div>
  );
}

function ChangeCount({ count, setCount, delta, setDelta }) {
  const handleChange = (e) => {
    const { value } = e.target;
    setDelta(value);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCount(
            parseInt(count) + parseInt(delta)
          );
        }}
      >
        <label htmlFor="enteredcount">Change the count by</label>
        <input type="text" id="enteredcount" onChange={handleChange} /><br />
        <button type="submit">Increase</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCount(
            parseInt(count) - parseInt(delta)
          );
        }}
      >
        <button type="submit">Decrease</button>
      </form>
    </>
  );
}

export default App;
