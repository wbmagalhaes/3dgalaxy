let bg;

let galaxy;
let angle = 0;
let offset = 0.4;

function preload() {
    bg = loadImage('images/background.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    let position = createVector(0, 0);
    galaxy = new Galaxy(
        position = position,
        center_size = 16,
        n_arms = 12,
        arm_size = 300,
        n_particles = 10,
        particle_size = 8);
}

function draw() {
    background(51);

    imageMode(CENTER);
    image(bg, 0, 0);

    push();
    rotateX(60 * PI / 180);
    rotateZ(angle);
    angle += 0.01;

    galaxy.draw(offset);

    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    let pos = createVector(0, 0);
    galaxy.reposition(pos);
}