import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

export default function Landing() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendHandler = () => {
    socket.emit("message-sent", message);
    console.log(chat);
    setChat([...chat, message]);
  };

  useEffect(() => {
    socket.on("message-got", (data) => {
      console.log(chat, data);
      setChat((oldArray) => [...oldArray, data]);
    });
  }, [socket]);

  const toDis = chat.map((data) => {
    return <div>{data}</div>;
  });

  return (
    <div>
      <input
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendHandler}>send message</button>
      <div>{toDis}</div>
    </div>
  );
}
