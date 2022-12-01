var dots = [];
var id = null;

async function start(name, updatePlayers){
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
        let pos = message.pos;
        //clear canvas
        //draw circle
        
        updatePlayers(dots);
        
    }
    function updatePos(pos){
        ws.send(JSON.stringify({type: "update", pos: pos}));
    }

    window.addEventListener('keydown', (e) => {
        if(e.key === 't'){
            console.log("id", id);
            console.log("players", dots.filter(dot => dot.id !== id));
        }
    });

    return updatePos;
    
}

async function connectToServer(){
    const ws = new WebSocket('ws://192.168.1.11:8080');
    return new Promise((resolve, reject) => {
        ws.onopen = () => {
            console.log('Connected to server');
            resolve(ws);
        }
    });
}


export default start;