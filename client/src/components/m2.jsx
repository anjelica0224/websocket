import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig() 
export default function Message2(){
    return(
        <div className="flex items-start justify-start">
            <Avatar className="mt-4" style={{ width: '2rem', height: '2rem' }} {...config} />
            <div className="flex flex-col font-['Gill_Sans','Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] p-2">
                <div className="flex justify-start">
                    <span className="font-normal pr-2  text-azure">Server</span>
                    <span className="text-sm pt-0.5 text-gray-500 ">13:10</span>
                </div>
                <div className="flex text-azure font-light self-start">Hey Welcome to the hub! <br/> This is a space for open discussion and exploration. <br/>Feel free to start a conversation that boggles our mind as well!<br/> Happy talking!</div>
            </div>
        </div>
    )
  
}