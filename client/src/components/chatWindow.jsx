import { nanoid } from 'nanoid'
import bandname from "bandname"
import { useState, useEffect, useRef } from "react"
import Input from "./input"
import Message from "./message"
import Send from "./sendButton"
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function ChatWindow(){
  const socketUrl = 'ws://127.0.0.1:443'
  const [input, setInput] = useState("")
  const endMessage = useRef(null)
  const [name, ] = useState(() => bandname())
  const [id, ] = useState(() => nanoid())
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
  const { 
    sendJsonMessage, 
    lastMessage, 
    readyState 
  } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('WebSocket connection established')
      if (name){
        sendJsonMessage({
          id,
          name,
          date: new Date(),
          text: `${name} just joined the chat`,
          type: 'mine'
        })
        console.log('why')
      }
    },
    onClose: () => {
      console.log('WebSocket connection closed')
    },
    onError: (error) => {
      console.error('WebSocket error:', error)
    },
    share: true
  });

  useEffect(() => {
  if (lastMessage !== null) {
    const topass = JSON.parse(lastMessage.data)
    console.log(`Received:`, topass)
    
    if(topass.type === 'msg'){
      console.log(`Processing message:`, topass.message)
      const messageData = JSON.parse(topass.message)
      setMessages(prev => [...prev, messageData])
    } 
    else if(topass.type === 'mine'){
      console.log(`Processing notif:`, topass.message)
      const messageData = JSON.parse(topass.message)
      const joinText = `${messageData.name} just joined the chat`
      const isDuplicate = messages.some(msg => 
        msg.name === 'Server' && 
        msg.text === joinText
      )
      console.log(messages.some(msg => 
        msg.name === 'Server' && 
        msg.text === joinText
      ))
      if (!isDuplicate){
        setMessages(prev => [...prev, {
          id: 'server',
          name: 'Server',
          date: new Date(),
          text: `${messageData.name} just joined the chat`
        }])
      }
    }
  }
}, [lastMessage]);
 
  // console.log(input)
  function handleEvent(e) {
    setInput(e.target.value)
  }

  function handleSend() {
    if (input === "" || readyState !== ReadyState.OPEN) return
    console.log('handleSend')
    sendJsonMessage({
      id,
      name,
      date: new Date(),
      text: input,
      type: 'msg'
    });
    setInput("");
  }

  const scrollToBottom = () => {
    endMessage.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return(
    <div className="h-screen w-full bg-[url(https://i.pinimg.com/736x/8e/1c/18/8e1c18e08df9e22ede87d3fb438c8b18.jpg)] bg-no-repeat bg-fixed bgmysize px-8 pt-12 pb-32 md:pb-28">
      <div className="bg-cinder/70 w-full h-full rounded-4xl max-w-lg mx-auto flex flex-col pb-4 px-2 ">
        <div className="flex flex-col py-2 px-4 rounded-4xl grow overflow-y-scroll">
          {/* {messages.map((item, idx) => <Message key={idx} name={item.name}> {item.text} </Message>)} */}
          {messages.map((item, idx) => (
            <Message key={idx} name={item.name} id={item.id}>
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