var havePointerLock =
	'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if (havePointerLock) {
	console.log('pointer lock is available');
} else {
	console.log('pointer lock is not available');
}
CAMERA.rotation.order = 'YXZ';

function mousemove (event) {
	CAMERA.rotation.y -= event.movementX / 200;
	CAMERA.rotation.x -= event.movementY / 200;
}

var element = RENDERER.domElement;
var pointerlockchange = function (event) {
	if (
		document.pointerLockElement === element ||
		document.mozPointerLockElement === element ||
		document.webkitPointerLockElement === element
	) {
		console.log('pointer lock is now active');
		RENDERER.domElement.addEventListener('mousemove', mousemove);
	} else {
		console.log('pointer lock is now inactive');
		RENDERER.domElement.removeEventListener('mousemove', mousemove);
	}
};
var pointerlockerror = function (event) {
	console.log('pointer lock error');
};
document.addEventListener('pointerlockchange', pointerlockchange, false);
document.addEventListener('mozpointerlockchange', pointerlockchange, false);
document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
document.addEventListener('pointerlockerror', pointerlockerror, false);
document.addEventListener('mozpointerlockerror', pointerlockerror, false);
document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

var requestPointerLock = function (element) {
	element.requestPointerLock =
		element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
	element.requestPointerLock();
};
element.addEventListener('click', function (event) {
	requestPointerLock(element);
});
