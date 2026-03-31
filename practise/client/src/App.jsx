import { useEffect, useState } from "react"






function App() {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {

    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected');
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      console.log("Received message", message.data);
      setMessages((m) => [...m, message.data]);
    }


    return () => {
      socket.close();
    }

  }, [])


  const handleSending  =  () => {
    socket.send(message);
    setMessage('');
  }







  if (!socket) {
    return <div>  Connecting to socket.. .. ..  </div>
  }


  return (
    <div>   

          <div>
            <input
            value={message}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                handleSending();
                setMessage('');
              }
            }}
             onChange={(e) => setMessage(e.target.value)}
              type="text"
               />
            <button onClick={handleSending}> Send </button>
          </div>
           <div> Messages are:- </div>
          <div style={{color:'red', display:'flex', flexDirection:'column'}} > {messages} </div>      

        </div>
  )
}

export default App
