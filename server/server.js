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
    var slidin = `${clientID} just joined the chat!!`

    function color(){
        let decimal = 1;
        for(let i=0;i<5;i++){
            decimal *= (clientID+i)
        }
        return `#${decimal.toString(16)}`
    }
    console.log(`${color()}`)

    //ws.send('You just joined the chatroom!')
    ws.on('close', ()=>console.log('client disconnected'))
    ws.on('message', data => {
        const data1 = data.toString();
        var object = {
            id : `clientID${clientID}`, message : data1, date: Date(), pfp: color(), prompt :slidin
        }
        socket.clients.forEach(client => {
            console.log(`sending message: ${data}`)
            client.send(JSON.stringify(object))
        })
        
    })
    ws.on('error', () => console.log('websocket error')) 
})

