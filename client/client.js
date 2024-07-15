const url = 'ws://127.0.0.1:443'

const socket = new WebSocket(url)



const mytexts = document.getElementById("messages")
const myinput = document.getElementById('input')
const button = document.getElementById('send')
button.disabled = true
button.addEventListener("click", sendM, false)

function sendM(){
    const txt = myinput.value
    socket.send(txt)
    myinput.value = ""
}

function Message(from, what, time){
    const box = document.createElement("div")
    box.setAttribute("class", "box")

    //const pfp = document.createElement("button")
    // function stringToColour(str){
    //     let hash = 0;
    //     str = from * from+1 * from+2 * from+3
    //     str.split('').forEach(char => {
    //         hash = char.charCodeAt(0) + ((hash << 5) - hash)
    //     })
    //     let colour = '#'
    //     for (let i = 0; i < 3; i++) {
    //         const value = (hash >> (i * 8)) & 0xff
    //         colour += value.toString(16).padStart(2, '0')
    //     }
    //     return colour
    //     }
    // pfp.setAttribute("class", "pfp")
    // pfp.setAttribute("color",`${stringToColour(from)}`)
    // box.appendChild(pfp)

    const ID = document.createElement("span")
    ID.innerText = `${from}`
    ID.setAttribute("class", "ID")
    box.appendChild(ID)

    const MESS = document.createElement("span")
    MESS.innerText = `${what}`
    MESS.setAttribute("class", "MESS")
    box.appendChild(MESS)

    const time1 = new Date(time)
    const hour = time1.getHours()
    const min = time1.getMinutes()
    const WHEN = document.createElement("span")
    WHEN.innerText = `${hour}:${min}`
    WHEN.setAttribute("class", "WHEN")
    box.appendChild(WHEN)

    mytexts.appendChild(box)
}

var initial = "Hey Welcome to the hub! \n This is a space for open discussion and exploration. \nFeel free to start a conversation that boggles our mind as well!\n Happy talking!"
var initial1 = "This is a space for open discussion and exploration."
var Server = "Server"
function inM(){
    var now = new Date();
    Message(Server, initial, now)
}
function inM1(){
    var now = new Date();
    Message(Server, initial1, now)
}

socket.onopen = function() {
    button.disabled = false
    let timer = setTimeout(inM, 1000);
    timer()
}
socket.onmessage = (event) => {
    const topass = JSON.parse(event.data)
    if(topass.message != ""){Message(topass.id, topass.message, topass.date)}
    
    //Message(JSON.parse(event.data).id, JSON.parse(event.data).message, JSON.parse(event.data).date)
    //MessageID((JSON.parse(event.data).date))
    //MessageID(event.data.toString().message)
    //const senttxt = JSON.parse(event.data).message
    //console.log(senttxt)
    //const dataBuffer = Buffer.from(senttxt)
    //onst utf16Decoder = new TextDecoder('UTF-16')
   // console.log(dataBuffer.toString())
    //console.log('whew')
    //console.log(utf16Decoder.decode(dataBuffer))
    //console.log( JSON.parse(event.data))
    

}