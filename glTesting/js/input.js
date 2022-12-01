const input = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
}

function keydown(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        input.right = true;
    }
    if (event.key === "ArrowLeft" || event.key === "a") {
        input.left = true;
    }
    if (event.key === "ArrowUp" || event.key === "w") {
        input.forward = true;
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        input.backward = true;
    }
    if(event.key === "Shift") {
        input.shift = true;
    }
}
function keyup(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        input.right = false;
    }
    if (event.key === "ArrowLeft" || event.key === "a") {
        input.left = false;
    }
    if (event.key === "ArrowUp" || event.key === "w") {
        input.forward = false;
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        input.backward = false;
    }
    if(event.key === "Shift") {
        input.shift = false;
    }
}

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);