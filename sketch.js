let bg, dust;

let galaxy;
let spiral_offset = -0.14;

let x_rotation, z_rotation;

function preload() {
    bg = loadImage('images/background.jpg');
    dust = loadImage('images/spacedust.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    galaxy = new Galaxy(
        n_arms = 8,
        arm_size = 250,
        n_particles = 15,
        particle_size = 120);

    x_rotation = 60 * PI / 180;
    z_rotation = 0;

    let gl = document.getElementById('defaultCanvas0').getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    imageMode(CENTER);
    rectMode(CENTER);

    noStroke();
    fill(255);
}

function mouseClicked() {
    galaxy = new Galaxy(
        n_arms = 8,
        arm_size = 250,
        n_particles = 15,
        particle_size = 120);
}

function draw() {
    push();
    translate(0, 0, -500);
    image(bg, 0, 0);
    pop();

    push();
    rotateX(x_rotation);
    rotateZ(z_rotation);
    z_rotation += 0.002;

    galaxy.draw(spiral_offset);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}