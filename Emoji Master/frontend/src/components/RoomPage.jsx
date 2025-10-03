export default function RoomPage({roomID, roomMessages, gameState}) {
    return (
        <>
        <div className="flex  gap-50">
            <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
                <h1 className="font-bold">Room {roomID} </h1>
                
                <div className="flex flex-col gap-0.5 w-max">{roomMessages.map(message => {
                    return <p key={message} className="font-bold">{message}</p>
                })}
                </div>
            </div>
            <div className="w-full">
                <h2>Players:</h2>
                <ol className="list-decimal">
                    {(gameState?.players ?? []).map((player) =>{
                        if(player === gameState ["leader"]){
                            return <li key={player}>{player}👑</li>
                        }
                        else return <li key={player}>{player}</li>
                    })}
                </ol>
            </div>
        </div>
        </>
    )
}