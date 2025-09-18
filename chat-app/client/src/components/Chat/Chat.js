import { React, useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client'
import { useLocation } from "react-router";

let socket;

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const location = useLocation();
    useEffect(() => {
        const {newname , newroom} = queryString.parse(location.search);
        setName(newname);
        setRoom(newroom)

    },[location.search])

    return <h1>Chat</h1>
};

export default Chat;