import { nanoid } from 'nanoid'
import bandname from "bandname"
import { useState, useEffect, useRef } from "react"
import Input from "./input"
import Message from "./message"
import Send from "./sendButton"
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function ChatWindow(){
  const [input, setInput] = useState("")
  const endMessage = useRef(null)
  const [name, ] = useState(() => bandname())
  const [id, ] = useState(() => nanoid())
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState(() => ([
    {
      id: "server",
      name: "Server",
      date: new Date(),
      text: "Hey Welcome to the hub! \n This is a space for open discussion and exploration \n Feel free to start a conversation that boggles our mind as well! \n Happy talking!"
    },
    {
      id: "server",
      name: "Server",
      date: new Date(),
      text: `${name} just joined the chat`
    }
  ]))
 
  // console.log(input)
  function handleEvent(e) {
    setInput(e.target.value)
  }

  function handleSend() {
    if (input === "") return
    if(ws) {
      ws.send(JSON.stringify({
        id,
        name,
        date: new Date(),
        text: input
      })) 
    }
    
  }

  const scrollToBottom = () => {
    endMessage.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    const websocket = new WebSocket('ws://127.0.0.1:443');

    websocket.onopen = () => {
        console.log('WebSocket is connected');
        // Generate a unique client ID
    };

    websocket.onmessage = (event) => {
      const topass = JSON.parse(event.data)
      console.log(`${topass.message}`)
      // setMessages(prev => prev.concat(topass))
      if((topass).type === 'msg'){
          console.log(`hello ${topass.message}`)
          setMessages(prev => prev.concat(JSON.parse(topass.message)))
          setInput("")
      }
      // else if(topass.type === 'connection'){
      //     console.log(`bbye ${topass.message}`) 
      //     setMessages(prev => prev.concat(JSON.parse(topass.message)))
      //     setInput("")
      // }
    }
    setWs(websocket);
  }, []);

  

  return(
    <div className="h-screen w-full bg-[url(https://i.pinimg.com/736x/8e/1c/18/8e1c18e08df9e22ede87d3fb438c8b18.jpg)] bg-no-repeat bg-fixed bgmysize px-8 pt-12 pb-32 md:pb-28">
      <div className="bg-cinder/70 w-full h-full rounded-4xl max-w-lg mx-auto flex flex-col pb-4 px-2 ">
        <div className="flex flex-col py-2 px-4 rounded-4xl grow overflow-y-scroll">
          {/* {messages.map((item, idx) => <Message key={idx} name={item.name}> {item.text} </Message>)} */}
          {messages.map((item, idx) => (
            <Message key={idx} name={item.name}>
              {item.text.split('\n').map((line, i) => (
                <div key={i}>{line || '\u00A0'}</div>
              ))}
            </Message>
          ))}
          <div ref={endMessage}/>
        </div>
        <div className="flex bg-fade/50 p-2 rounded-4xl">
          <Input
            value={input}
            onChange={handleEvent}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Send onSend={handleSend} />
        </div>
      </div>
    </div>
  )
}