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
        var counter = 0;
        var section = floor(random(this.genes.length) / 10);
        var source = this;
        
        for(var i=0; i<this.genes.length; i++) {

            if(counter == section) {
                section = floor(random(this.genes.length) / 10);
                counter = 0;
                if(source === this) {
                    source = partner;
                } else {
                    source = this;
                }
            } 

            newdna.genes[i] = source.genes[i];
            counter++;
        }
        
        return newdna;
    }
    
    /**
     * randomly mutates the set of genes at a certain rate 
     */
    mutation() {
        for(var i=0; i<this.genes.length; i++) {
            if (random(1) < MUTATION_RATE) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(MAXFORCE);
            }
        }
    }
    
}