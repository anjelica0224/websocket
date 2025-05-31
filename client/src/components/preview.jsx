import {FileIcon, XCircleIcon} from "@phosphor-icons/react"
export default function Preview({srcFile, onRemove}) {
    const type = srcFile.match(/data:([^;]+);/)[1]
    const extension = type.split('/')[1]
    const isImage = type.startsWith('image/')
  
    if (isImage) {
      return (
        <div className="relative group inline-block m-1">
          <img
            src={srcFile}
            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
          />
          {onRemove && <XCircleIcon onClick={onRemove} size={32} className="hidden absolute -top-0.5 -right-1 rounded-full w-4 h-4 items-center justify-center text-red-400  hover:text-red-500 bg-white group-hover:block cursor-pointer"  weight="fill" />}
        </div> 
      )
    }

    return (
      <div className="relative group inline-block m-1">
        <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-300 flex flex-col items-center justify-center">
          <FileIcon className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-500 w-full text-center uppercase font-medium">
            {extension}
          </span>
        </div>
        {onRemove && <XCircleIcon onClick={onRemove} size={32} className="hidden absolute -top-0.5 -right-1 rounded-full w-4 h-4 items-center justify-center text-red-400  hover:text-red-500 bg-white group-hover:block cursor-pointer"  weight="fill" />}
      </div>
    )
 
  }
