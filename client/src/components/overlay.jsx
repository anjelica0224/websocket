import {XIcon} from "@phosphor-icons/react";
export default function Overlay({isOpen, onClose, children}){
  return(
      <>
    {
      isOpen ? (
          <div className="absolute top-0 bg-black/70 h-screen w-screen">
              <XIcon size={30} color="#ffffff" weight="bold" onClick={onClose} className="absolute right-8 top-8 cursor-pointer" />
              {children}
          </div>
      ) : null
    }
      </> 
  )
}