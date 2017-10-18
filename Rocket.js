/**
 * Rocket Class
 */
class Rocket {
    
    /**
     * Rocket Constructor
     * @param {DNA} dna  optional DNA
     */
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
    
    /**
     * force Vector to be applied to acceleration
     * @param {p5.Vector} force 
     */
    applyForce(force) {
        this.acc.add(force);
    }
    
    
    /**
     * update this Rocket at each iteration
     */
    update() {



        // evaluate if we reached the target
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d <= 15) {
            this.onTarget=true;
            this.counts = count;
        }
        
        // evaluate if we crashed into obstacle
        if (
            this.pos.x > obstacle.x &&
            this.pos.x < obstacle.x + obstacle.w &&
            this.pos.y > obstacle.y &&
            this.pos.y < obstacle.y + obstacle.h
        ) {
            this.crashed = true;
        }
        
        // evaluate if we crached into the side borders
        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        // evaluate if we crashed into the top/bottom borders
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }

        // apply the force for the current iterations Vector in dna.gene
        this.applyForce(this.dna.genes[count]);

        // apply physics to rocket if we are still moving
        if (!this.onTarget && !this.crashed) {
            this.vel.add(this.acc);  
            this.pos.add(this.vel);
            this.acc.mult(0);
            
            this.vel.limit(4);
        }
        
        return (this.onTarget || this.crashed);
    }
    
    /**
     * calculate this Rockets fitness based on discance to target and crashed status
     */
    calcFitness() {
        
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);
        
        if (this.onTarget) {
            this.fitness *= 5 * (LIFESPAN/this.counts);
        }
        
        if (this.crashed) {
            this.fitness /= 2;
        }
        
    }
    
    /**
     * draw this rocket on the canvas 
     */
    show() {
        var opacity = 180;
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() +1.5707963267948966);
        
        if(this.crashed) {
            opacity = 50;
        }
        if(this.onTarget) {
            opacity = 255;
        }
 
        fill(255, opacity);
        triangle(0, 0,-5, 15 , 5, 15);
        
        pop();
    }
    
}