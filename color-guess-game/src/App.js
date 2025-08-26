import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [color, setColor] = useState('Null');

  useEffect(() => {
    const fetchcolor = async () => {
    const response = await fetch('/colors.json');
    const result = await response.json();
    setColor(result[Math.floor(Math.random()*result.length)]);
  }
  fetchcolor();
},[])

  return (
    <>
      {color}
    </>
  );
}

export default App;
