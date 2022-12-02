//main game loop
import start from "./client.js";

var players = [];
var playerObjects = [];

function updatePlayers(players_update){
    playerObjects.forEach(player => {
        SCENE.remove(player);
    });
    players = players_update;
    players.forEach(player => {
        var geometry = new THREE.SphereGeometry( .5, 32, 32 );
        var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.position.x = player.pos.x;
        sphere.position.z = player.pos.z;
        sphere.position.y = player.pos.y;
        playerObjects.push(sphere);
        SCENE.add(sphere);
    });
}
var updatePos = await start("test", updatePlayers);

function animate() {
    requestAnimationFrame(animate);
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

    CAMERA.position.x -= right / 30;
    CAMERA.position.z -= forward / 30;

    updatePos({x: CAMERA.position.x, y: CAMERA.position.y, z: CAMERA.position.z});
}

animate();