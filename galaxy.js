class Galaxy {

    constructor(n_arms, arm_size, n_particles, particle_size) {
        let angle_step = 2 * PI / n_arms;

        this.arms = [];
        for (let i = 0; i < n_arms; i++) {
            let arm = new Arm(angle_step * i, arm_size, n_particles, particle_size);
            this.arms.push(arm);
        }
    }

    draw(offset) {
        for (let i = 0; i < this.arms.length; i++) {
            const arm = this.arms[i];
            arm.draw(offset);
        }
    }
}

class Arm {

    constructor(angle, size, n_particles, particle_size) {
        this.angle = angle;
        this.size = size;

        let pos_step = size / n_particles;

        this.particles = [];
        for (let i = 0; i < n_particles; i++) {
            let pos = pos_step * (i + 1);

            let p_size = map(pos, pos_step, size, particle_size, 0.4 * particle_size);
            let p_alpha = map(pos, pos_step, size, 127, 12);

            let particle = new Particle(pos, p_size, p_alpha);
            this.particles.push(particle);
        }
    }

    draw(offset) {
        push();
        rotateZ(this.angle);

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            particle.draw(offset * i, this.angle);
        }

        pop();
    }
}

class Particle {

    constructor(pos_x, size, alpha) {
        this.pos_x = pos_x;
        this.size = size;
        this.alpha = alpha;

        this.rotZ = random(-PI, PI);
    }

    draw(offset, arm_angle) {
        push();
        rotateZ(offset);
        translate(this.pos_x, 0, 0);

        // desfaz as rotações, faz a imagem virar pra camera
        rotateZ(-offset);
        rotateZ(-arm_angle);
        rotateZ(-z_rotation);
        rotateX(-x_rotation);

        rotateZ(this.rotZ);

        tint(255, this.alpha);
        texture(dust);
        rect(0, 0, this.size, this.size);

        pop();
    }
}