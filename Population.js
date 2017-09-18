
class Population {
    
    constructor() {
        this.rockets = [];
        this.matingPool = [];
        this.size = POPSIZE;
        
        for (var i=0; i<this.size; i++) {
            this.rockets[i] = new Rocket();
        }
        
    }
    
    
    evaluate() {
        
        
        // evaluate highest fitness
        var maxfit = 0;
        var minfit = 10000;
        var avgfit = 0;
        var crashed = 0;
        var target = 0;
        
        for (var i=0; i<this.size; i++) {
            this.rockets[i].calcFitness();
            
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
            
            if (this.rockets[i].fitness < minfit) {
                minfit = this.rockets[i].fitness;
            }
            
            if (this.rockets[i].crashed) {
                crashed++;
            }
            if (this.rockets[i].onTarget) {
                target++;
            }
            
            avgfit+=this.rockets[i].fitness;
        }
        avgfit /= this.size;
        
        fitP.html(
            "Fitness:<br>  MAX=" + floor(maxfit) +
            "<br>  MIN=" + floor(minfit) +
            "<br>  AVG=" + floor(avgfit) +
            "<br>  Crashed=" + crashed +
            "<br>  On Target=" + target
        );
      //  console.log(maxfit, avgfit);
        
        // normalize fitness values to 0 to 1
        for (var i=0; i<this.size; i++) {
            this.rockets[i].fitness /= maxfit;
        }
        
        
        // populataing mating pool with multiplies of rockets according to their
        // Fitness. (fit rockets will be in matig pool more times)
        this.matingPool = [];
        for (var i=0; i<this.size; i++) {
            var n = this.rockets[i].fitness * 100;
            
            for(var j=0; j<n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
            
        }
        
            
    }
    
    
    selection() {
        var newRockets = [];
        
        for(var i=0; i < this.rockets.length; i++ ) {
            var parentA = random(this.matingPool).dna;
            var parentB = random(this.matingPool).dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            
            newRockets[i] = new Rocket(child);
        }
        
       
        this.rockets = newRockets;
        
    }
    
    
    run() {
        
        for (var i=0; i<this.size; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
        
    }
    
    
}
