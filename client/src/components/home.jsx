import { ListIcon } from "@phosphor-icons/react";
export default function Home({openOverlayFn}){
  return(
    <div className="relative h-dvh w-screen">
      <img
        className="fixed -z-10 h-dvh w-screen object-cover"
        src="https://images.unsplash.com/photo-1520531158340-44015069e78e?fm=jpg&q=60&w=3000"
      />
      <div className="flex gap-2 justify-items-center">
        <ListIcon size={24} color="#ffffff" className="ms-2 mt-1 cursor-pointer" onClick={openOverlayFn} />
        <span className="text-neutral-100 font-serif text-2xl">About</span>
      </div>
      <div className="mx-auto flex h-svh w-screen flex-col items-center justify-end-safe sm:justify-center sm:items-end-safe p-18 sm:flex-row gap-2 ">
        <span className="font-caveat p-2 text-4xl font-semibold text-neutral-100 whitespace-nowrap myshadow">my kinda</span>
        <h1 className="font-cinzel text-6xl font-bold text-neutral-100 myshadow whitespace-nowrap sm:text-7xl">BELL JAR</h1>
      </div>
    </div>
  )
}
