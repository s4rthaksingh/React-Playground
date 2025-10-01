import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:3000')

function App() {
  return (
    <>
      <div className='h-screen w-screen items-center justify-center'>
        <h1>Hello World!</h1>
      </div>
    </>
  )
}

export default App
