// const url = 'ws://localhost:443'
const url = 'https://websocket-serverrr.onrender.com'
const socket = new WebSocket(url)
// let foo = prompt('Type here');
// let bar = confirm('Confirm or deny');
// console.log(foo, bar);

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
function timeformat(time){
    const time1 = new Date(time)
    var hour = time1.getHours()
    if (hour < 10)  {hour = '0'+hour;}
    var min = (time1.getMinutes())
    if ((min) < 10) {min = '0'+min;}
    return `${hour}:${min}`

}
function Circle(obj){
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    for(prop in obj) {
        line.setAttribute(prop, obj[prop])  
    }
    return line;
}

function SvgContainer(obj) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("class", "pfps")
    for(prop in obj) {
        svg.setAttribute(prop, obj[prop])  
    }
    return svg;
}


function Message(from, what, time, profile){
    var svgParent = new SvgContainer({
        'width': 30,
        'height': 30
    });
    var CIRCLE = new Circle({
        'r': 15,
        'cx': 15,
        'cy': 15,
        'fill': profile
    });
    svgParent.appendChild(CIRCLE)
    
    let box = document.getElementById("box")
    let clone = box.cloneNode(true)
    
    box.children[0].appendChild(svgParent)
    box.children[1].children[0].children[0].innerText = `${from}`
    box.children[1].children[0].children[1].innerText = `${timeformat(time)}`
    box.children[1].children[1].children[0].innerText = `${what}`
    box.id = 'box1'
    document.getElementById('messages').appendChild(clone)
}

var initial = "Hey Welcome to the hub! \n This is a space for open discussion and exploration. \nFeel free to start a conversation that boggles our mind as well!\n Happy talking!"
var initial1 = "you can start now!"
var Server = "Server"
function inM(){
    var now = new Date();
    Message(Server, initial, now, "#99aab5")
}
function inM1(){
    var now = new Date();
    Message(Server, initial1, now, "#99aab5")
}
function Slide(id){
    const slide = document.createElement("slide")
    slide.innerText = id
    const sidebar = document.getElementById('sidebar')
    sidebar.appendChild(slide)
}

socket.onopen = (event) => {
    button.disabled = false
    let timer = setTimeout(inM, 2000);
    let timer1 = setTimeout(inM1, 3000);  
}
socket.onmessage = (event) => {
    const topass = JSON.parse(event.data)
    if((topass).type === 'msg'){
        console.log(`${(topass).type}`)
        if(topass.message != ""){Message(topass.id, topass.message, topass.date, topass.pfp)}
    }
    else if(topass.type === 'connection'){
        console.log(`${(topass).notif}`)
        Message(Server,topass.notif, topass.date, "#99aab5")
    }
}
