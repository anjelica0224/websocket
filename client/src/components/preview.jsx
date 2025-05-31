import {FileIcon} from "@phosphor-icons/react"
export default function Preview({srcFile, onRemove}) {
    const type = srcFile.match(/data:([^;]+);/)[1]
    const extension = type.split('/')[1]
    const isImage = type.startsWith('image/')
  
    if (isImage) {
      return (
        <div className="relative inline-block m-1">
          <img
            src={srcFile}
            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
          />
          {onRemove && <button onClick={onRemove} className="absolute -top-1 -right-0.5 bg-red-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-500">x</button>}
        </div> 
      )
    }
    
    return (
      <div className="relative inline-block m-2">
        <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-300 flex flex-col items-center justify-center">
          <FileIcon className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-500 mt-1 w-full text-center uppercase font-medium">
            {extension}
          </span>
        </div>
        {onRemove && <button onClick={onRemove} className="absolute -top-1 -right-0.5 bg-red-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-500">x</button>}
      </div>
    )
 
  }
