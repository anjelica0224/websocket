import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig() 
export default function Message(){
    return(
        <div className="flex items-start justify-start">
            <Avatar className="mt-4" style={{ width: '2rem', height: '2rem' }} {...config} />
            <div className="flex flex-col font-['Gill_Sans','Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] p-2">
                <div className="flex justify-start">
                    <span className="font-normal pr-2  text-azure">Server</span>
                    <span className="text-sm pt-0.5 text-gray-500 ">13:10</span>
                </div>
                <div className="flex text-azure font-light self-start">clientID 19 just joined the chat!</div>
            </div>
        </div>
    )
  
}