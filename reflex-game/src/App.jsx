import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [gameRunning, setGameRunning] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    window.addEventListener('keydown',(e) => {
      if(e.key === 'q') setWinner('Player 1');
      if(e.key === 'l') setWinner('Player 2');
    })
  },[])

  return (
    <>
      <div className='flex h-screen w-screen text-[#38302E]'>
        <div className="w-1/2 bg-[#b6d7b9] font-thin">
          <h1 className='mt-4'>Player 1</h1>
          {winner==='Player 1' && <h1>Winner</h1>}
          <div className="flex h-full items-center justify-center"><h1 className='mb-50 '>Press Q</h1></div>
        </div>
        <div className='w-1/2 bg-[#9ABD97] font-thin'>
          <h1 className='mt-4'>Player 2</h1>
          {winner==='Player 2' && <h1>Winner</h1>}
          <div className="flex h-full items-center justify-center"><h1 className='mb-50 '>Press L</h1></div>
        </div>
      </div>
    </>
  )
}


export default App
