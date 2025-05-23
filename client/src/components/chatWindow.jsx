import { nanoid } from 'nanoid'
import bandname from "bandname"
import { useState, useEffect, useRef } from "react"
import Input from "./input"
import Message from "./message"
import Send from "./sendButton"

export default function ChatWindow(){
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
      text: "Have a good time!"
    }
  ]))
  // console.log(input)
  function handleEvent(e) {
    setInput(e.target.value)
  }

  function handleSend() {
    if (input === "") return
    setMessages(prev => prev.concat(
      {
        id,
        name,
        date: new Date(),
        text: input
      }
    ))
    setInput("")
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
        <div className="flex flex-col pt-2 px-4 grow overflow-y-scroll">
          {messages.map((item, idx) => <Message key={idx} name={item.name} >{item.text}</Message>)}
          <div ref={endMessage}/>
        </div>
        <div className="flex bg-fade/50 p-2 rounded-4xl">
          <Input value={input} onChange={handleEvent} onKeyDown={(e) => {if (e.key === "Enter") handleSend();}}/>
          <Send onSend={handleSend} />
        </div>
      </div>
    </div>
  )
}