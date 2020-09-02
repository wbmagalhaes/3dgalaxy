let bg, dust;

let galaxy;
let spiral_offset = -0.14;

let x_rotation, y_rotation, z_rotation;

function preload() {
    bg = loadImage('images/background.jpg');
    dust = loadImage('images/spacedust.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    galaxy = new Galaxy(
        createVector(0, 0, 0),
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

let sensitivityX = 0.001;
let sensitivityY = -0.001;

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
        let dx = (mouseX - pressedX) * sensitivityX;
        let dy = (mouseY - pressedY) * sensitivityY;

        z_rotation += dx;
        x_rotation += dy;
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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}