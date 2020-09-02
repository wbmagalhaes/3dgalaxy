let bg, dust;

let galaxies = [];

let x_rotation, y_rotation, z_rotation;

function preload() {
    bg = loadImage('images/background2.jpg');
    dust = loadImage('images/spacedust.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    for (let i = 0; i < 6; i++) {
        galaxy = new Galaxy(
            createVector(random(0, windowWidth), random(0, windowHeight), random(-200, 200)),
            n_arms = random(6, 16),
            arm_size = 250,
            n_particles = 15,
            particle_size = 120,
            spiral_offset = -0.14);
    }

    x_rotation = 0;
    y_rotation = 0;
    z_rotation = 0;

    let gl = document.getElementById('defaultCanvas0').getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    imageMode(CENTER);
    rectMode(CENTER);

    noStroke();
    fill(255);

    x_rotation = 60 * PI / 180;

    frameRate(24);
}

let pressedX = 0;
let pressedY = 0;
let isPressed = false;

let sensitivityX = -0.001;
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
    background(17, 14, 33);

    if (isPressed) {
        let dx = (mouseX - pressedX) * sensitivityX;
        let dy = (mouseY - pressedY) * sensitivityY;

        z_rotation += dx;
        x_rotation += dy;
    }

    push();
    translate(0, 0, -500);
    image(bg, 0, 0);
    pop();

    push();
    rotateX(x_rotation);
    rotateY(y_rotation);
    rotateZ(z_rotation);
    z_rotation += 0.0001 * deltaTime;

    galaxies.forEach(galaxy => {
        galaxy.draw();
    });

    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}