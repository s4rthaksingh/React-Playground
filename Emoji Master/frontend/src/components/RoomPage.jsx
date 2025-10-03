export default function RoomPage({roomID, roomMessage}) {
    return (
        <>
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
            <h1 className="font-bold">Room {roomID} </h1>
            <p className="font-bold">{roomMessage}</p>
        </div>
        </>
    )
}