const {WebSocketServer} = require('ws')
const fs = require ('fs')
const http = require('http')
const path = require('path');  
//const {Buffer} = require('buffer')
//import { Buffer } from 'buffer';
const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, '..', 'client', 'index.html');
    fs.readFile(indexPath, 'utf-8', (err, content) => {
        if (err) {
            console.error('Error reading index.html:', err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            return;
        }
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(content);
    });
});

const PORT = process.env.PORT || 443;
server.listen(PORT, () => console.log(`HTTP Server listening on ${PORT}`));
// server.listen(5500, () => console.log(`Listening on ${5500}`));

// const ws_port = process.env.PORT || 443;
const socket = new WebSocketServer({server})
socket.on('connection', (ws) => {
    var clientID = ws._socket._handle.fd;
    console.log(`new client ID${clientID} connected `)
    var slidin = `clientID${clientID} just joined the chat!`;
    var object1 = {
        type: 'connection',
        notif: `${slidin}`,
        date: Date(),
        id: `clientID${clientID}`
    }
    socket.clients.forEach(client => {
        console.log('sending notif')
        client.send(JSON.stringify(object1))
    })

    
    function color(){
        let decimal = 1;
        for(let i=0;i<5;i++){
            decimal *= (clientID+i)
        }
        return `#${decimal.toString(16)}`
    }
    
    ws.on('close', ()=>console.log('client disconnected'))
    ws.on('message', data => {
        const data1 = data.toString();
        var object = {
            type: 'msg',
            id : `clientID${clientID}`, message : data1, date: Date(), pfp: color(), slide: slidin
        }
        socket.clients.forEach(client => {
            console.log(`sending message: ${data}`)
            client.send(JSON.stringify(object))
        })
    })
    ws.on('error', () => console.log('websocket error')) 
})
