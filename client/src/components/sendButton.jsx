import { PaperPlaneTiltIcon } from "@phosphor-icons/react"
export default function Send({ onSend }){
  return(
    <PaperPlaneTiltIcon className="size-9 shrink-0 p-2 opacity-70 md:p-1 items-end text-gray-300 cursor-pointer" onClick={onSend} />
  )
  
}
