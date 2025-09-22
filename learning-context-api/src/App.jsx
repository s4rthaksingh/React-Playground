import { useState } from 'react'
import { LevelContext } from './LevelContext'
import Heading from './Heading'
import './App.css'

function App() {

  return (
   <Heading level={1} children={"Hello World!"}></Heading>
  )
}

export default App
