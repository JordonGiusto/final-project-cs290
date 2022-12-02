const input = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
}

function keydown(event) {
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        input.right = true;
    }
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        input.left = true;
    }
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        input.forward = true;
    }
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        input.backward = true;
    }
    if(event.key === "Shift") {
        input.shift = true;
    }
}
function keyup(event) {
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        input.right = false;
    }
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        input.left = false;
    }
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        input.forward = false;
    }
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        input.backward = false;
    }
    if(event.key === "Shift") {
        input.shift = false;
    }
}

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);