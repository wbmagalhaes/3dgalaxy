let bg, dust;

let galaxy;
let spiral_offset = 0.4;

let x_rotation, z_rotation;

function preload() {
    bg = loadImage('images/background.jpg');
    dust = loadImage('images/spacedust.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    galaxy = new Galaxy(
        n_arms = 12,
        arm_size = 300,
        n_particles = 14,
        particle_size = 120);

    x_rotation = 60 * PI / 180;
    z_rotation = 0;

    gl = this._renderer.GL;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    imageMode(CENTER);
}

function draw() {
    push();
    translate(0, 0, -500);
    image(bg, 0, 0);
    pop();

    push();
    rotateX(x_rotation);
    rotateZ(z_rotation);
    z_rotation += 0.003;

    galaxy.draw(spiral_offset);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}