import { useState } from 'react'
import Home from './components/home'
import Overlay from './components/overlay'
function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(0)
  console.log(isOverlayOpen)
  return (
    <>
    <Home openOverlayFn={()=> setIsOverlayOpen(!isOverlayOpen)} />
    <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}>
        <p className=' text-wheat text-xl p-8 max-w-3xl leading-[1.6] mx-auto mt-6'>
          Hey there, word nerds.<br/>So, cybersecurity was getting a little... well, not exactly thrilling. So someone told me something about building a <i>WebSocket</i> to get a relief from my boredom.
          <br/>Here's the gist: WebSockets basically create a permanent connection between your browser and this server, so messages zip back and forth in real-time, it's like a constant back-and-forth, just like a good conversation should be.
          <br/>Fast forward-this little chat space. You know, the kind where you can ditch the mainstream and actually have a conversation without the noise. Primarily for my friends, especially the ones grounded from using social media or stuck with wayy more stricter parents than mine(eye roll).
          Also there's a slight touch of Sylvia Plath inspiration(me and my naive headspace). You know, "The Bell Jar"? A place where we can riff on ideas, dissect the world. Let's see where the conversation takes us.
        </p>  
      
    </Overlay>
    
    </>
  )
}

export default App
