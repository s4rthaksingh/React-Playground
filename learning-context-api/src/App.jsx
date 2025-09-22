import { useState } from 'react'
import { LevelContext } from './LevelContext'
import Section from './Section'
import Heading from './Heading'
import './App.css'

function App() {

  return (
    <>
    <Section level={1}>
      <Heading children={"Hello World!"}></Heading>
      <Heading children={"Hello World!"}></Heading>
      <Heading children={"Hello World!"}></Heading>
      <Heading children={"Hello World!"}></Heading>
    </Section>
   </>
  )
}

export default App
