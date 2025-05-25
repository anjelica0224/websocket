const {WebSocketServer} = require('ws')
const http = require('http') 
const server = http.createServer((req, res) => {
//   res.writeHead(301, { "Location": "https://anjelica0224.github.io/websocket/" });
  res.writeHead(200);
  res.end("WebSocket server is running locally.");
});
const PORT = process.env.PORT || 443;
server.listen(PORT, () => console.log(`HTTP Server listening on ${PORT}`));

const socket = new WebSocketServer({server})
socket.on('connection', (ws) => {
    console.log('Client connected');
    // const joinMsg = {
    //     type: 'connection',
    //     name: 'Server',
    //     date: new Date(),
    //     message: `hi i just joined the chat!`
    // };
    // broadcast(joinMsg)
    
    ws.on('message', data => {
        const data1 = data.toString();
        const chatMsg = {
            type: 'msg',
            name: 'Server',
            date: new Date(),
            message: data1
        };
        broadcast(chatMsg);
    })
    ws.on('close', ()=>console.log('client disconnected'))
    ws.on('error', () => console.log('websocket error')) 
})

function broadcast(obj) {
  const data = JSON.stringify(obj);
  socket.clients.forEach(client => {
    console.log(`sending message: ${data}`)
    client.send(JSON.stringify(obj))
  })
}
