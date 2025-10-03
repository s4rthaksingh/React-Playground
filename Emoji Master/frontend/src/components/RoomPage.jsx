export default function RoomPage({roomID, roomMessages}) {
    return (
        <>
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
            <h1 className="font-bold">Room {roomID} </h1>
            {roomMessages.map(message => {
                return <p key={message} className="font-bold">{message}</p>
            })}
        </div>
        </>
    )
}