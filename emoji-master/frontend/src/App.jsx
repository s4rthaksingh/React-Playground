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
      <div className=''>
        
      </div>
    </>
  )
}

export default App
