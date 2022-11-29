var dots = [];

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false
}
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});




async function start(name){
    const ws = await connectToServer();
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    let pos = {x: 0, y: 0};
    

    function update(){
        var change = false;
        var diff = {x: 0, y: 0};
        if(keys.ArrowUp || keys.w){
            diff.y -= 1;
            change = true;
        }
        if(keys.ArrowDown || keys.s){
            diff.y += 1;
            change = true;
        }
        if(keys.ArrowLeft || keys.a){
            diff.x -= 1;
            change = true;
        }
        if(keys.ArrowRight || keys.d){
            diff.x += 1;
            change = true;
        }
        diff.x *= 5;
        diff.y *= 5;
        pos.x += diff.x;
        pos.y += diff.y;
        if(change){
            ws.send(JSON.stringify({type: 'update', pos}));
        }
        requestAnimationFrame(update);
    }
    update();

    document.body.onmousemove = (e) => {
        return;
        let pos = { x: e.clientX, y: e.clientY };
        let message = { pos };
        message.type = 'update'
        ws.send(JSON.stringify(message));
    }

    ws.onmessage = (e) => {
        let message = JSON.parse(e.data);
        if(message.type === 'innit'){
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
        } else if(message.type === 'playerListUpdate'){
            dots = message.dots;
            console.log("PlayerListUpdate", dots);
        }
        let pos = message.pos;
        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //draw circle
        dots.forEach(element => {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.arc(element.pos.x, element.pos.y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillText(element.name, element.pos.x, element.pos.y + 20)
        });
        
    }
    ws.on
}

async function connectToServer(){
    const ws = new WebSocket('ws://192.168.1.111:8080');
    return new Promise((resolve, reject) => {
        ws.onopen = () => {
            console.log('Connected to server');
            resolve(ws);
        }
    });
}


export default start;