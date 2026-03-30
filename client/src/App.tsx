import { useEffect, useState } from "react"


function App() {

  const [socket, setScoket] = useState<null | WebSocket>(null);

  const [messages, setMessages] = useState<string[]>([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('connected')
      setScoket(socket)
    }

    socket.onmessage = (message) => {
      console.log('Received message', message.data)
      setMessages(m => [...m, message.data])
    }


    return () => {
      socket.close();
    }

  }, [])


  if (!socket) {
    return <div> Connecting to real-time world.... </div>
  }

  return (
    <div>
      <input onChange={(e) => {
        setMessage(e.target.value)
      }} type="text" name="" id="" />
      <button onClick={() => socket.send(message)}> Send </button>
      <h1> Messages are :- </h1>
      <p style={{ color: 'red' }}> {messages} </p>
    </div>
  )


}

export default App
