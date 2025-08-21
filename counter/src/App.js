import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  function increment(){
    setCount(count+1);
  }

  return (
      <Counter count={count} increment={increment}/>
  );
}

function Counter({count, increment}){
  return <div>
    <h2>{count}</h2>
    <button onClick={increment}>Click me!</button>
  </div>
}

export default App;
