let frogX, frogY;
let frogAngle;

function setup() {
  createCanvas(800, 800);
  frogAngle = 0;
  frogX = width/2;
  frogY = height/2;
}

function draw() {
  background(255);
  push();
    translate(frogX, frogY);
    rotate(radians(frogAngle));
    scale(5, 5);
    translate(-10, -7);
    drawfrog();
  pop();
  drawfrog();
}

function keyTyped(){
  if(key == 'w'){
    frogY -= 10;
    frogAngle = 0;
  }
  if(key == 'd'){
    frogX += 10;
    frogAngle = 90;
  }
  if(key == 's'){
    frogY += 10;
    frogAngle = 180;
  }
  if(key == 'a'){
    frogX -= 10;
    frogAngle = 270;
  }
}

function drawfrog() {
  noStroke();
  fill(32, 219, 36);
  beginShape();
  vertex(9, 1);
  vertex(13, 1);
  vertex(14, 4);
  vertex(17, 6);
  vertex(18, 5);
  vertex(18, 1);
  vertex(21, 3);
  vertex(19, 4);
  vertex(19, 8);
  vertex(16, 7);
  vertex(19, 9);
  vertex(20, 10);
  vertex(21, 14);
  vertex(18, 15);
  vertex(18, 11);
  vertex(15, 10);
  vertex(13, 13);
  vertex(8, 13);
  vertex(7, 11);
  vertex(5, 10);
  vertex(4, 15);
  vertex(1, 13);
  vertex(3, 11);
  vertex(4, 8);
  vertex(6, 9);
  vertex(6, 7);
  vertex(3, 7);
  vertex(3, 4);
  vertex(1, 3);
  vertex(5, 1);
  vertex(4, 6);
  vertex(8, 4);
  vertex(9, 1);
  endShape();
  fill(248, 235, 21);
  ellipse(11, 7, 2, 2);
  fill(253, 3, 217);
  ellipse(7, 3, 2, 2);
  ellipse(15, 3, 2, 2);
}
