import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import http from 'http';

const app = express();

const server = http.createServer(app);


const wss = new WebSocketServer({ server });


let userCount = 0;
wss.on("connection", function connection(ws) {
    ws.on('error', console.error);

    ws.on("message", function message(data, isBinary) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });

    });

    console.log(`UserCount: ${++userCount}`);
    ws.send("Welcome to the WebSocket server!");
})


server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
