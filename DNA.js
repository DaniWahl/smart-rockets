class DNA {
    
    constructor() {
        this.genes = [];
        
        for (var i=0; i<LIFESPAN; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag( MAXFORCE );
        }
    }
    
    
    crossover(partner) {
        var newdna = new DNA();
        var mid = floor(random(this.genes.length));
        
        for(var i=0; i<this.genes.length; i++) {
            if (i > mid) {
                newdna.genes[i] = this.genes[i];
            } else {
                newdna.genes[i] = partner.genes[i];
            }
        }
        
        
        return newdna;
    }
    
    mutation() {
        for(var i=0; i<this.genes.length; i++) {
            if (random(1) < 0.005) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(MAXFORCE);
            }
        }
        
    }
    
}