const {WebSocketServer} = require('ws')
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running locally.");
});
const PORT = process.env.PORT || 443;
server.listen(PORT, () => console.log(`HTTP Server listening on ${PORT}`));

const socket = new WebSocketServer({server})
socket.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (data, isBinary) => {
    console.log(data)
    const data1 = data.toString();
    console.log(` data1 ${data1}`)
    const parsedData = JSON.parse(data1);
    console.log(`parsedData ${parsedData}`)
    console.log(parsedData.type)
    if (parsedData.type === 'msg') {
      const chatMsg = {
        type: 'msg',
        message: data1
      };
      broadcast(chatMsg);
    } 
    else if (parsedData.type === 'mine') {
      const joinMsg = {
        type: 'mine',
        message: data1
      };
      broadcast(joinMsg);
    }
  })
  
  ws.on('close', () => console.log('client disconnected'))
  ws.on('error', () => console.log('websocket error'))
})

function broadcast(obj) {
  const data = JSON.stringify(obj);
  socket.clients.forEach(client => {
    console.log(`sending message: ${data}`)
    client.send(JSON.stringify(obj))
  })
}