import { use, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import './App.css'
import JoinPage from './components/joinPage';
import RoomPage from './components/roomPage';

const socket = io('http://localhost:3000')

function App() {
  const [roomID, setRoomID] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [roomJoined, setRoomJoined] = useState(false);
  const [roomMessages, setRoomMessages] = useState([]);
  const [gameState, setGameState] = useState({});
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on("roomMessage", (message) => {
      if(!roomJoined) setRoomJoined(true);

      setRoomMessages((prevRoomMessages) => [...prevRoomMessages, message ])
    })

    socket.on("updateGameState", (newGameState) => setGameState(newGameState));

  },[])

  function handleJoin() {
    if(roomID.trim() === '') setDisplayMessage("Please provide a room ID");
    else if(username.trim() === '') setDisplayMessage("Please provide a username");
    else {
      socket.emit("joinRoom",  roomID, username)
      setDisplayMessage(`Joining room ${roomID}...`)
    }
  }


  if(!roomJoined) return (<>
    <JoinPage setRoomID={setRoomID} setUsername={setUsername} handleJoin={handleJoin} displayMessage={displayMessage}/>
    </>
  )

  else return(
    <>
      <RoomPage roomID={roomID} roomMessages={roomMessages} gameState={gameState}/>
    </>
  )
}

export default App
