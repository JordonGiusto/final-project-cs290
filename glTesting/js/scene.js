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


GEOMETRY = new THREE.PlaneGeometry(10, 10, 10);
MATERIAL = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
const PLANE = new THREE.Mesh(GEOMETRY, MATERIAL);
PLANE.receiveShadow = true;

SCENE.add(PLANE);

const light = new THREE.DirectionalLight( 0xfffff0, .7 );
light.position.set( 10, 5, 7 );
light.shadow.camera.far = 500;
light.shadow.camera.left = -20;
light.shadow.camera.right = 20;
light.shadow.camera.top = 20;
light.shadow.camera.bottom = -20;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.castShadow = true;
SCENE.add( light );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
SCENE.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFa040, .2, 30);
pointLight.position.set(0, 7, 5);
pointLight.castShadow = false;
pointLight.shadow.mapSize.width = 256;
pointLight.shadow.mapSize.height = 256;

const duplicatePointLight = pointLight.clone();
duplicatePointLight.position.set(0, 7, -5);

SCENE.add(pointLight);
SCENE.add(duplicatePointLight);


RENDERER.setClearColor(0x588597, 1);

PLANE.rotation.x = Math.PI / 2;
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