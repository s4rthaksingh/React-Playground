import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [bal, setBal] = useState(0)

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
        <h2>Your balance : {bal}</h2>
        <button onClick={()=>{setBal(bal+1)}}>Work</button>
      </div>
    </>
  )
}

export default App
