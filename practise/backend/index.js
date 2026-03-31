import express from 'express'
import { WebSocket, WebSocketServer } from 'ws'
import http from 'http'
const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({server});


wss.on("connection", async(ws) => {

    ws.on('error', console.error);


    ws.on('message',async(data, isBinary) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){

                client.send(data, {binary: isBinary})
            }
        });
    });

    console.log('Welcome! to WebSocketServer...')

})


server.listen(8080, () => {
    console.log("Websocket server is up.....")
})