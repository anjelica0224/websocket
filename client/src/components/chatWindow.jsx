import { nanoid } from 'nanoid'
import bandname from "bandname"
import { PlusCircleIcon} from "@phosphor-icons/react"
import { useState, useEffect, useRef } from "react"
import Input from "./input"
import Message from "./message"
import Send from "./sendButton"
import Preview from './preview'
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function ChatWindow(){
  const socketUrl = import.meta.env.PROD ? "wss://aj-websocket.foo.ng" : 'ws://127.0.0.1:443'
  const [input, setInput] = useState("")
  const endMessage = useRef(null)
  const [name, ] = useState(() => bandname())
  const [id, ] = useState(() => nanoid())
  const [file, setFile] = useState([])
  const inputFile = useRef(null)
  const [messages, setMessages] = useState(() => ([
    {
      id: "server",
      name: "Server",
      date: timeformat(),
      text: "Hey Welcome to the hub! \n This is a space for open discussion and exploration \n Feel free to start a conversation that boggles our mind as well! \n Happy talking!"
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
          date: timeformat(),
          text: `${name} just joined the chat`,
          type: 'mine'
        })
      }
    },
    onClose: () => {
      console.log('WebSocket connection closed')
    },
    onError: (error) => {
      console.error('WebSocket error:', error)
    },
    share: true,
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const topass = JSON.parse(lastMessage.data)
      
      if(topass.type === 'msg'){
        const messageData = JSON.parse(topass.message)
        setMessages(prev => [...prev, messageData])
      } 
      else if(topass.type === 'mine'){
        const messageData = JSON.parse(topass.message)
        const joinText = `${messageData.name} just joined the chat`
        setMessages(prev => [...prev, {
          id: 'server',
          name: 'Server',
          date: timeformat(),
          text: `${messageData.name} just joined the chat`
        }])
      }
    }
  }, [lastMessage]);
 
  function handleInputEvent(e) {
    setInput(e.target.value)
  }

  function timeformat() {
    const time1 = new Date() 
    let hour = time1.getHours()
    if (hour < 10) { hour = '0' + hour; }
    let min = time1.getMinutes()
    if (min < 10) { min = '0' + min; }
    return `${hour}:${min}`
  }


  function handleSend() {
    if (readyState !== ReadyState.OPEN) return
    if (input.trim() === "" && (!file || file.length === 0)) return
    sendJsonMessage({
      id,
      name,
      date: timeformat(),
      text: input,
      type: 'msg',
      media: file
    });
    setInput("");
    setFile([]);
  }

  const scrollToBottom = () => {
    endMessage.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleFileChange = (e) => {
    const uploaded = e.target.files
    for(let i=0; i<uploaded.length; i++){
      new Promise((resolve, reject)=> {
        let baseURL = ""
        let size = uploaded[i].size
        if (size>5242880){
          alert(`File "${uploaded[i].name}" exceeds 5 MB limit`)
          reject(new Error("File size exceeds 5 MB"))
          return
        }
        let reader = new FileReader()
        reader.readAsDataURL(uploaded[i])
        reader.onload = () => {
          baseURL = reader.result
          setFile(prev => [...prev, {
            file_name: uploaded[i].name,
            base64: baseURL
          }])
          resolve(baseURL)
        }
      })  
    }
  }

  const remove = (idx) => {
    setFile(prev => prev.filter((_, indx) => indx !== idx))  
  }

  const uploadFile = (e) => {
    e.preventDefault()
    inputFile.current.click()
  }

  return(
    <div className="h-dvh w-full bg-[url(https://i.pinimg.com/736x/8e/1c/18/8e1c18e08df9e22ede87d3fb438c8b18.jpg)] bg-no-repeat bg-fixed bgmysize px-8 pt-12 pb-32 md:pb-28">
      <div className="bg-cinder/70 w-full h-full rounded-4xl max-w-lg mx-auto flex flex-col pb-4 px-2 ">
        <div className="flex flex-col py-2 px-4 rounded-4xl grow overflow-y-scroll">
          {/* {messages.map((item, idx) => <Message key={idx} name={item.name}> {item.text} </Message>)} */}
          {messages.map((item, idx) => (
            <Message key={idx} name={item.name} id={item.id} date={item.date}>
              {item.text.split('\n').map((line, i) => (
                <div key={i}>{line || '\u00A0'}</div>
              ))}
              {item.media && item.media.length > 0 && (
                <div className="flex flex-wrap">
                  {item.media.map((mediaFile, mediaIdx) => (
                    <Preview key={mediaIdx} srcFile={mediaFile} download_media={true}/>
                  ))}
                </div>
              )}
            </Message>
          ))}
          <div ref={endMessage}/>
        </div>

        {file.length > 0 && (
          <div className="px-4 py-2">
            <div className="bg-gray-100/20 rounded-lg p-2">
              <div className="flex flex-wrap max-h-19 items-center overflow-y-scroll">
                {file.map((fileData, index) => (
                  <Preview 
                    key={index} 
                    srcFile={fileData} 
                    onRemove={() => remove(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex bg-fade/50 p-2 rounded-4xl">
          <PlusCircleIcon className="size-9 shrink-0 p-2 mt-1 mb-1 ml-1 opacity-70 md:p-1 text-gray-300 cursor-pointer" onClick={uploadFile}  />
          <input type="file" ref={inputFile} onChange={handleFileChange} multiple={true} style={{ display: 'none' }}></input>
          <Input
            value={input}
            onChange={handleInputEvent}
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