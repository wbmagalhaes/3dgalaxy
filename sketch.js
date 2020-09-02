let bg, dust;

let galaxy;
let spiral_offset = -0.14;

let x_rotation, y_rotation, z_rotation;

function preload() {
    bg = loadImage('images/background.jpg');
    dust = loadImage('images/spacedust.png');
}

function setup() {
    createCanvas(bg.width, bg.height, WEBGL);

    galaxy = new Galaxy(
        n_arms = 8,
        arm_size = 250,
        n_particles = 15,
        particle_size = 120);

    x_rotation = 0;
    y_rotation = 0;
    z_rotation = 0;

    let gl = document.getElementById('defaultCanvas0').getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    imageMode(CENTER);
    rectMode(CENTER);

    noStroke();
    fill(255);
}

let pressedX = 0;
let pressedY = 0;
let isPressed = false;

let sensitivityX = 0.1;
let sensitivityY = 0.1;

function mousePressed() {
    pressedX = mouseX;
    pressedY = mouseY;

    isPressed = true;
}

function mouseReleased() {
    isPressed = false;
}

function draw() {

    if (isPressed) {
        let dx = mouseX - pressedX;
        let dy = mouseY - pressedY;

        let rotX = dx * sensitivityX;
        let rotY = dy * sensitivityY;
        x_rotation += rotX;
        y_rotation += rotY;
    }

    background(51);

    push();
    rotateX(x_rotation);
    rotateY(y_rotation);
    rotateZ(z_rotation);
    z_rotation += 0.002;

    galaxy.draw(spiral_offset);
    pop();
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }