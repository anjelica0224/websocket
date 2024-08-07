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
socket.on('connection', (ws) => {
    // ws.on('open', function open() {
    //     console.log('A new client has connected');
    //   });
    var clientID = ws._socket._handle.fd;
    console.log(`new client ID${clientID} connected `)
    //ws.send(`new client ID${clientID} connected`)
    var slidin = `clientID${clientID} just joined the chat!!`;
    function color(){
        let decimal = 1;
        for(let i=0;i<5;i++){
            decimal *= (clientID+i)
        }
        return `#${decimal.toString(16)}`
    }
    //console.log(`colorid of user : ${color()}`)

    //ws.send('You just joined the chatroom!')
    // ws.on('open', () =>{
    //     // var slidin = `clientID${clientID} just joined the chat!!`
    //     // //console.log(`sending: ${slidin}`)
    //     // console.log(JSON.stringify(slidin))
    //     if (this.socket.readyState == WebSocket.OPEN ) {
    //         var slidin = `clientID${clientID} just joined the chat!!`
    //         console.log(JSON.stringify(slidin))
    //         // console.log('works')
    //         // this.socket.send("works")
    //         // this.send_data();
    //         }
            
    // })
    ws.on('close', ()=>console.log('client disconnected'))
    ws.on('message', data => {
        var object1 = {
            type: 'connection',
            notif: `${slidin}`
        }
        const data1 = data.toString();
        var object = {
            type: 'msg',
            id : `clientID${clientID}`, message : data1, date: Date(), pfp: color(), slide: slidin
        }
        socket.clients.forEach(client => {
            console.log(`sending message: ${data}`)
            client.send(JSON.stringify(object))
            // console.log('sending notif')
            // client.send(JSON.stringify(object1))
        })
    })
    ws.on('error', () => console.log('websocket error')) 
})
