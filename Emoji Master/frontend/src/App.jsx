import { useState } from 'react'
import { io } from 'socket.io-client';
import './App.css'
import JoinPage from './components/joinPage';

const socket = io('http://localhost:3000')

function App() {
  const [roomID, setRoomID] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  function handleJoin() {
    if(roomID.trim() === '') setErrorMessage("Please provide a room ID");
    else {
      socket.emit("joinRoom",  roomID)
      setErrorMessage(`Joining room ${roomID}`)
    }
  }

  return (<>
    <JoinPage setRoomID={setRoomID} handleJoin={handleJoin} errorMessage={errorMessage}/>
    </>
  )
}

export default App
