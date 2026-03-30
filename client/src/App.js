import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
function App() {
    const [socket, setScoket] = useState(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            console.log('connected');
            setScoket(socket);
        };
        socket.onmessage = (message) => {
            console.log('Received message', message.data);
            setMessages(m => [...m, message.data]);
        };
    }, []);
    if (!socket) {
        return _jsx("div", { children: " Connecting to real-time world.... " });
    }
    return (_jsxs("div", { children: [_jsx("input", { type: "text", name: "", id: "" }), _jsx("button", { onClick: () => socket.send("Hello Raj"), children: " Send " }), _jsx("h1", { children: " Messages are :- " }), _jsxs("p", { style: { color: 'red' }, children: [" ", messages, " "] })] }));
}
export default App;
//# sourceMappingURL=App.js.map