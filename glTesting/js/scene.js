//setup threejs renderer, camera, and scene

const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
RENDERER.shadowMap.enabled = true;
RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;



document.body.appendChild( RENDERER.domElement )
let GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
let MATERIAL = new THREE.MeshPhongMaterial({color: 0xffffff});
const CUBE = new THREE.Mesh(GEOMETRY, MATERIAL);
CUBE.castShadow = true;
CUBE.receiveShadow = true;


GEOMETRY = new THREE.PlaneGeometry(10, 10, 10);
MATERIAL = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
const PLANE = new THREE.Mesh(GEOMETRY, MATERIAL);
PLANE.receiveShadow = true;

SCENE.add(PLANE);
SCENE.add(CUBE);


const light = new THREE.DirectionalLight( 0xffffb0, .7 );
light.position.set( 10, 10, 7 );
light.shadow.camera.far = 500;
light.shadow.camera.left = -10;
light.shadow.camera.right = 10;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.castShadow = true;
SCENE.add( light );

const ambientLight = new THREE.AmbientLight(0x0b0ff, 0.1);
SCENE.add(ambientLight);

RENDERER.setClearColor(0x588597, 1);

PLANE.rotation.x = Math.PI / 2;
CUBE.position.y = 0.5;
CAMERA.position.y = .5;

CAMERA.position.z = 5;

CAMERA.yVelocity = 0;

window.addEventListener('keydown', function (event) {
    if(CAMERA.position.y > 0.5){
        return;
    }
    if(event.key == ' '){
        CAMERA.yVelocity = 0.1;
    }
});

var loader = new OBJLoader();
loader.load(
    // resource URL
    'pillar.obj',
    // called when resource is loaded
    function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshPhongMaterial({color: 0xffffff});
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        SCENE.add( object );
    }
);