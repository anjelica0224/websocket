import { PaperPlaneTiltIcon } from "@phosphor-icons/react"
import Input from "./input"
import Message from "./m1"
import Message2 from "./m2"

export default function ChatWindow(){
  return(
    <div className="h-screen w-full bg-[url(https://i.pinimg.com/736x/8e/1c/18/8e1c18e08df9e22ede87d3fb438c8b18.jpg)] bg-no-repeat bg-fixed bgmysize px-8 pt-12 pb-32 md:pb-28">
      <div className="bg-cinder/70 w-full h-full rounded-4xl max-w-lg mx-auto flex flex-col pb-4 px-2">
        <div className="flex flex-col pt-2 px-4 grow">
          <Message/>
          <Message2/>
        </div>
        <div className="flex bg-fade/50 p-2 rounded-4xl">
          <Input />
          <PaperPlaneTiltIcon size={32} className="p-2 opacity-70 md:p-1 items-end-safe text-gray-300" />
        </div>
      </div>
    </div>
  )
}