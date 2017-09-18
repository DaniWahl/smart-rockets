
class Rocket {
    
     constructor (dna) {
        this.pos = createVector(width/2, height-20);
        this.vel = p5.Vector.random2D();
        this.vel = createVector();
        this.acc = createVector();
        this.dna = dna || new DNA();
        this.fitness = 0;
        this.onTarget = false;
        this.crashed = false;
        this.counts = 0;
        
    }
    
    
    applyForce(force) {
        
        this.acc.add(force);
    }
    
    
    update() {
        
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        
        if (d <= 15) {
            this.onTarget=true;
            this.counts = count;
        }
        
        
        if (
            this.pos.x > obstacle.x &&
            this.pos.x < obstacle.x + obstacle.w &&
            this.pos.y > obstacle.y &&
            this.pos.y < obstacle.y + obstacle.h
        ) {
            this.crashed = true;
        }
        
        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }

        this.applyForce(this.dna.genes[count]);

        if (!this.onTarget && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            
            this.vel.limit(4);
        }
        
    }
    
    
    calcFitness() {
        
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);
        
        if (this.onTarget) {
            this.fitness *= 5 * (LIFESPAN/this.counts);
        }
        
        if (this.crashed) {
            this.fitness /= 4;
        }
        
    }
    
    
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() +1.5707963267948966);
        
        fill(255, 180);
        triangle(0, 0,-5, 15 , 5, 15);
        
        pop();
    }
    
}