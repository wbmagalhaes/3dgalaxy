class Galaxy {

    constructor(position, center_size, n_arms, arm_size, n_particles, particle_size) {
        this.position = position;
        this.center_size = center_size;

        let angle_step = 2 * PI / n_arms;

        this.arms = [];
        for (let i = 0; i < n_arms; i++) {
            let arm = new Arm(angle_step * i, arm_size, n_particles, particle_size);
            this.arms.push(arm);
        }
    }

    reposition(position) {
        this.position = position;
    }

    draw(offset) {
        noStroke();
        fill(255);

        push();
        translate(this.position.x, this.position.y);

        sphere(this.center_size);

        for (let i = 0; i < this.arms.length; i++) {
            const arm = this.arms[i];
            arm.draw(offset);
        }

        pop();
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
            let p_size = map(pos, 0, size, particle_size, 0.2 * particle_size);

            let particle = new Particle(pos, p_size);
            this.particles.push(particle);
        }
    }

    draw(offset) {
        stroke(255);
        noFill();
        strokeWeight(1);

        push();
        rotate(this.angle);

        // line(0, 0, this.size, 0);

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            particle.draw(offset * i);
        }

        pop();
    }
}

class Particle {

    constructor(pos_x, size) {
        this.pos_x = pos_x;
        this.size = size;
    }

    draw(offset) {
        noStroke();
        fill(255);

        push();
        rotate(offset);
        translate(this.pos_x, 0, 0);

        sphere(this.size);
        image(dust, 0, 0);

        pop();
    }
}