var dots = [];
var id = null;

async function start(name, updatePlayers, recieveMessage){
    const ws = await connectToServer();
    ws.onmessage = (e) => {
        let message = JSON.parse(e.data);
        if(message.type === 'innit'){
            id = message.id;
            
            dots = message.dots;
            console.log("Innit", dots);
            ws.send(JSON.stringify({type: "name", name: name}))
        } else if(message.type === 'update'){
            const dot = dots.find(dot => dot.id === message.id);
            if(dot){
                dot.pos = message.pos;
            }
        } else if(message.type === 'disconnect'){
            const index = dots.findIndex(dot => dot.id === message.id);
            dots.splice(index, 1);
            console.log("Disconnect", dots);
            updatePlayers(dots);
        } else if(message.type === 'playerListUpdate'){
            dots = message.dots;
            console.log("PlayerListUpdate", dots);
        }
        else if(message.type === 'message'){
            console.log("MESSAGE: " + message.message );
            recieveMessage(message.message);
            return;
        }
        let pos = message.pos;
        //clear canvas
        //draw circle
        
        updatePlayers(dots);
        
    }
    function updatePos(pos){
        ws.send(JSON.stringify({type: "update", pos: pos}));
    }
    function sendMessage(message){
        console.log("Sending message: " + message);
        ws.send(JSON.stringify({type: "message", message: `[${name}]: ${message}`}));
    }
    window.addEventListener('keydown', (e) => {
        if(e.key === 't'){
            console.log("id", id);
            console.log("players", dots.filter(dot => dot.id !== id));
        }
    });

    return {updatePos, sendMessage};
    
}

async function connectToServer(){
    const ws = new WebSocket('ws://ec2-35-165-126-189.us-west-2.compute.amazonaws.com:8080');
    return new Promise((resolve, reject) => {
        ws.onopen = () => {
            console.log('Connected to server');
            resolve(ws);
        }
    });
}


export default start;