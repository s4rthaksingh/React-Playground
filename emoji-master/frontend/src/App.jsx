import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:3000')

function App() {
  const [latestUser, setLatestUser] = useState(null);

  useEffect(() => {
    socket.on("newUser", (user) => {
      setLatestUser(user);
    })
  }, [])

  return (
    <>
      {latestUser ? latestUser : "No one is connected yet"}
    </>
  )
}

export default App
