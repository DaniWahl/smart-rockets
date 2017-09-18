const LIFESPAN = 700;
const MAXFORCE = 0.3;
const POPSIZE = 100;

var population;
var count=0;
var countP;
var fitP;
var target;
var generation = 1;
var oscacle = { } ;


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

function draw() {
    background(0);
    population.run();
    countP.html("Generation:" + generation );
    
    count++;
    if (count == LIFESPAN) {
        
        population.evaluate();
        population.selection();
        
        count=0;
        generation++;
    }
    
    
    fill(255,255,50);
    ellipse(target.x, target.y, 30, 30);
    
    fill(255);
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    
}
