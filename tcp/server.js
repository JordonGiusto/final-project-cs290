const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080, host:'0.0.0.0' });

const clients = new Map();

function connection(ws) {
    console.log('CONNECTION:');
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    let pos = {x: 0, y: 0, z: 0};
    const metadata = { id, pos };
    clients.set(ws, metadata);

    function updatePlayerArray(first = false){
        if(first){
            console.log(id);
        }
        const innitMessage = {
            type: first? 'innit' : 'playerListUpdate',
            id: id,
            dots: [...clients.values()].map(client => ({ id: client.id, pos: client.pos, name:client.name })),
        };
        if(first){
            ws.send(JSON.stringify(innitMessage));
            return;
        }
        
        [...clients.keys()].forEach(client => {
            client.send(JSON.stringify(innitMessage));
        });
    }
    updatePlayerArray(true);
    
    function message(messageAsString){
        const message = JSON.parse(messageAsString);
        let metadata = clients.get(ws);
        if(message.type == 'name'){
            console.log("NAME: " + message.name )
            metadata.name = message.name;
            clients.set(ws, metadata)
            updatePlayerArray();
        }
        else if(message.type = 'update'){
            metadata.pos = message.pos;
            message.id = metadata.id;
            [...clients.keys()].forEach(client => {
                client.send(JSON.stringify(message));
            });
        }
        
    }
    ws.on('message', message);

    function close(){
        const metadata = clients.get(ws);
        const message = { id: metadata.id, pos: metadata.pos, type: 'disconnect' };

        [...clients.keys()].forEach(client => {
            client.send(JSON.stringify(message));
        });
        clients.delete(ws);
    }
    ws.on('close', close);
    ws.on('error', close);

}
wss.on('connection', connection);

wss.on('listening', () => {
    console.log(`Server started at ${wss.address().address}:${wss.address().port}`);
});




function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }