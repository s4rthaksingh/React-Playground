import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex  w-screen h-screen'>
        <div className='bg-green-300'>

        </div>
        <div className='bg-red-400'>

        </div>
      </div>
    </>
  )
}

export default App
