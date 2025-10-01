import { useState } from 'react'
import { io } from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:3000')

function App() {
  const [roomID, setRoomID] = useState('');

  return (
    <>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <h1>Enter Room ID</h1> 
        <input placeholder='Enter here...' className='m-3 border border-black rounded-sm px-3 py-2 focus:outline-none' type="text" onChange={(e) => setRoomID(e.target.value)}/>
        <button className='hover:outline-2 bg-[#1a1a1a]'>Join</button>
      </div>
    </>
  )
}

export default App
