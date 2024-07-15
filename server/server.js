const {WebSocketServer} = require('ws')
const fs = require ('fs')
const http = require('http')
//const {Buffer} = require('buffer')
//import { Buffer } from 'buffer';
http.createServer((req,res) => {
    const content = fs.readFileSync('client.html', 'utf-8')
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end('content')
})
.listen(5500, () => console.log(`Listening on ${5500}`));



const socket = new WebSocketServer({port: 443})
socket.on('connection', ws => {
    var clientID = ws._socket._handle.fd;
    console.log(`new client ID${clientID} connected `)
    //ws.send('You just joined the chatroom!')
    ws.on('close', ()=>console.log('client disconnected'))
    ws.on('message', data => {
        //var d= Date()
        //var t= d.toLocaleTimeString
        const data1 = data.toString();
        /*function getColor(){
            var hashh = 5381;
            var hash = hashh * clientID * (clientID+1)
            var r = (hash & 0xFF0000) >> 16;
            var g = (hash & 0x00FF00) >> 8;
            var b = hash & 0x0000FF;
            return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
        }*/
        var object = {
            id : `clientID${clientID}`, message : data1, date: Date()
        }
        socket.clients.forEach(client => {
            console.log(`sending message: ${data}`)
            client.send(JSON.stringify(object))
            //client.send(`ClientID${clientID} says: ${data}`)
        })
        
    })
    ws.on('error', () => console.log('websocket error')) 
})

