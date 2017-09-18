/*
* class DNA
* 
*/
class DNA {
  
    /**
     * DNA Constructor
     * creates a new DNA object
     */
    constructor() {
        this.genes = [];
        
        for (var i=0; i<LIFESPAN; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag( MAXFORCE );
        }
    }
    
    /**
     * creates and returns a new DNA object with a fresh set of Genes
     * mixed from this and partner.
     * @param {DNA} partner   
     * @returns {DNA}  
     */
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
    
    /**
     * randomly mutates the set of genes at a certain rate 
     */
    mutation() {
        for(var i=0; i<this.genes.length; i++) {
            if (random(1) < 0.005) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(MAXFORCE);
            }
        }
    }
    
}