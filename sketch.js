/**
 * Smart Rockets sketch.
 * Uses p5.js 
 * Author: Daniel Wahl, 2017-09-19
 */


// global constants and variables
const LIFESPAN = 300;   // number of steps for each rocket generation
const POPSIZE = 100;    // number of rockets in each population
const MAXFORCE = 0.5;   // force (magnitide) for Vectors
const MUTATION_RATE = 0.001;

var population;
var countP;
var fitP;
var target;
var oscacle = { } ;
var generation = 1;   // counter of generations 
var count = 0;        // counter of steps


/**
 * p5.js setup() function
 * creates canvas, rocket population, target and obstacle objects
 */
function setup() {
    createCanvas(800, 600);
    population = new Population();
    countP = createP();
    fitP = createP();
    target = createVector(width/2, 100);
    
    obstacle = {
        x : 200,
        y : 250,
        w : 400,
        h : 30
    };
}


/**
 * p5.js draw() function
 * iterates rockets and draws background & target/obstable objects
 */
function draw() {
    background(0);
    var complete = population.run();  // runs the whole population of rockets
    countP.html("Generation:" + generation );
    
    count++;
    if (count == LIFESPAN || complete === 1) {
        
        // if run is over, evaluate current & create new population of rockets
        population.evaluate();
        population.selection();
        
        count=0;
        generation++;
    }
    
    
    // draw target & obstacle
    fill(255,255,50);
    ellipse(target.x, target.y, 30, 30);
    
    fill(255);
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    
}
