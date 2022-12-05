//main game loop
import start from "./client.js";

var players = [];
var playerObjects = [];

function updatePlayers(players_update){
    players = players_update;
    for(let i = playerObjects.length; i < players.length; i++){
        let SphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
        let material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
        playerObjects.push(new THREE.Mesh(
            SphereGeometry,
            material
        ));
        playerObjects[i].castShadow = true;
        playerObjects[i].receiveShadow = true;
        SCENE.add(playerObjects[i]);
    }
    for(let i = players.length; i < playerObjects.length; i++){
        //SCENE.remove(playerObjects[i]);
    }
    for(let i = 0; i < players.length; i++){
        playerObjects[i].position.set(players[i].pos.x, players[i].pos.y, players[i].pos.z);
    }
}

function recieveMessage(message){
    let chatDiv = document.querySelector('#messages');
    let messageDiv = document.createElement('div');
    messageDiv.innerHTML = message;
    chatDiv.appendChild(messageDiv);
}




function animate(updatePos) {
    requestAnimationFrame(() => animate(updatePos));
    RENDERER.render(SCENE, CAMERA);

    var forward = (input.forward ? 1 : 0) - (input.backward ? 1 : 0);
    var right = (input.right ? 1 : 0) - (input.left ? 1 : 0);

    var tmp = forward;
    forward = forward * Math.cos(CAMERA.rotation.y) + right * Math.sin(CAMERA.rotation.y);
    right = tmp * Math.sin(CAMERA.rotation.y) - right * Math.cos(CAMERA.rotation.y);

    var magnetude = Math.sqrt(forward * forward + right * right);
    

    if (magnetude > 0) {
        forward /= magnetude;
        right /= magnetude;
    }

    if(input.shift){
        forward *= 3;
        right *= 3;
    }

    CAMERA.position.y += CAMERA.yVelocity;
    CAMERA.yVelocity -= 0.005;


    if (CAMERA.position.y < 0.5) {
        CAMERA.position.y = 0.5;
        CAMERA.yVelocity = 0;
    }

    var newPos = {
        x: CAMERA.position.x - right/30,
        y: CAMERA.position.y,
        z: CAMERA.position.z - forward/30
    }

    let inContainerx = true;
    let inContainerz = true;
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        if (Math.abs(container.x - newPos.x) < container.x_size && Math.abs(container.z - CAMERA.position.z) < container.z_size) {
            inContainerx = true;
        }
        if(Math.abs(container.z - newPos.z) < container.z_size && Math.abs(container.x - CAMERA.position.x) < container.x_size){
            inContainerz = true;
        }
    }
    if(document.activeElement == document.body){
        if(inContainerx) CAMERA.position.x = newPos.x;
        if(inContainerz) CAMERA.position.z = newPos.z;
    }

    updatePos({x: CAMERA.position.x, y: CAMERA.position.y, z: CAMERA.position.z});
}


document.querySelector('#startButton').addEventListener('click', async function(){
    var name = document.querySelector('#name').value;
    if(name == ''){
        alert('Please enter a name');
        return;
    }
    var {updatePos, sendMessage} = await start(name, updatePlayers, recieveMessage);
    animate(updatePos);
    document.querySelector('#messageInput').addEventListener('keydown', function(event){
        if(event.key == "Enter"){
            if(this.value != "" && this == document.activeElement){
                sendMessage(this.value);
                this.value = "";
            }
        }
    });
    document.querySelector('#container').style.display = 'none';
    document.querySelector('#chat').style.display = 'flex';
});




