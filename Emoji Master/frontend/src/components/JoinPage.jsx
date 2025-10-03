export default function JoinPage({handleJoin, setRoomID, displayMessage}){
    
  return (
      <>
        <div className='h-full w-full flex flex-col items-center justify-center'>
          <h1>Enter Room ID</h1> 
          <input placeholder='Enter here...' className='m-3 border border-black rounded-sm px-3 py-2 focus:outline-none' type="text" onChange={(e) => setRoomID(e.target.value)}/>
          <p className="mb-3 font-bold">{displayMessage}</p>
          <button onClick={handleJoin} className='hover:outline-2 bg-[#1a1a1a]'>Join</button>
        </div>
      </>
    )
}