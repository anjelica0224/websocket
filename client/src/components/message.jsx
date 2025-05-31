import Avatar, { genConfig } from 'react-nice-avatar'

export default function Message({children, date, name, id}){
  const unique = `${name} ${id}`
  const config = genConfig(unique) 
  return(
    <div className="flex items-start justify-start">
      <Avatar className="mt-4 size-10 shrink-0"  {...config} />
      <div className="flex flex-col font-['Gill_Sans','Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] p-2">
        <div className="flex justify-start">
          <span className="font-normal pr-2  text-azure">{name}</span>
          <span className="text-sm pt-0.5 text-gray-500 ">{date}</span>
        </div>
        <div className="flex flex-col text-azure font-light self-start">{children}</div>
      </div>
    </div>
  )
  
}