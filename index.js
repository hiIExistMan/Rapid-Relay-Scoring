let timer = 60;
let running = true;
let switching = false;
let scoring = false;

let passes = 0;
let goals = 0;

let s1 = false;
let s2 = false;
let s3 = false;
let s4 = false;


let board, open, closed;



function preload() {
    board = loadImage("rapid-relay.png");
    closed = loadImage("close_switch.png");
    open = loadImage("open_switch.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
}

function mousePressed() {
    if(mouseY > height/2 && running) {
        goals++;
    } else if(running) {
        passes++;
    }

    if(!running && !switching) {
        running = true;
        goals = 0;
        passes = 0;
    }

    if(scoring) {
        scoring = false;
        timer = 60000;
        goals = 0;
        passes = 0;
        s1 = false;
        s2 = false;
        s3 = false;
        s4 = false;
        running = true;
        let osc = new p5.Oscillator();
  osc.start();
  osc.freq(440);
  setTimeout(osc.stop,500);

        setTimeout(() => {
            let osc = new p5.Oscillator();
  osc.start();
  osc.freq(440);
  setTimeout(osc.stop,500);
        },35000);
        setTimeout(() => {
            let osc = new p5.Oscillator();
  osc.start();
  osc.freq(440);
  setTimeout(osc.stop,500);
        },25000);
    }

    if(switching) {
        if(mouseY > height*0.8) {
            switching = false;
            scoring = true;
        }

        if(mouseX > width/2 && mouseY > height/2 && mouseY < height*0.8) {
            s4 = !s4;
        }
        if(mouseX < width/2 && mouseY > height/2 && mouseY < height*0.8) {
            s3 = !s3;
        }
        if(mouseX > width/2 && mouseY < height/2 && mouseY < height*0.8) {
            s2 = !s2;
        }
        if(mouseX < width/2 && mouseY < height/2 && mouseY < height*0.8) {
            s1 = !s1;
        }
    }
}

    

function draw() {
    background(51);
    if(running) {
        strokeWeight(8);
        noFill();
        stroke(255,127,127);
        arc(width/2,height/2,100,100,HALF_PI,HALF_PI-6.28*(timer/60000));
        timer -= deltaTime;
        if(timer <= 0) {
            running = false;
            switching = true;
            let osc = new p5.Oscillator();
              osc.start();
              osc.freq(440);
              setTimeout(osc.stop,500);
            
        }
    } else if(switching) {
        image(board,0,height/3,width,height/3);

        image(s1 ? open : closed,width*0.275,height*0.4,width*0.112,height*0.07125);
        image(s2 ? open : closed,width*0.63,height*0.4,width*0.112,height*0.07125);
        image(s3 ? open : closed,width*0.275,height*0.495,width*0.112,height*0.07125);
        image(s4 ? open : closed,width*0.63,height*0.495,width*0.112,height*0.07125);
    } else if(scoring) {
        let passScore = 0;
        let switches = s1+s2+s3+s4;
        if(switches == 0) passScore = 1;
        if(switches == 1) passScore = 4;
        if(switches == 2) passScore = 8;
        if(switches == 3) passScore = 10;
        if(switches == 4) passScore = 12;

        let score = passScore*passes+goals+switches;
        textAlign(CENTER,CENTER);
        textSize(64);
        text(score,width/2,height/2)
    }
}
