function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  sunFlower(200, 200);
}

function drawGrid(x, y, r) {
  let spacing = 10; 
  stroke(0); 
  for (let i = x - r; i < x + r; i += spacing) {
    for (let j = y - r; j < y + r; j += spacing) {
      if (dist(x, y, i, j) <= r) {
        strokeWeight(2);
        point(i, j);
      }
    }
  }
}

function sunFlower(x_co, y_co){

  stroke(0);
  line(x_co, y_co+80, x_co, y_co+200);

  let i = 4;
  for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
    let x = x_co + cos(angle) * 60;
    let y = y_co + sin(angle) * 60;
    push();
    translate(x, y);
    rotate(radians(i*22.5));
    ellipse(0, 0, 20, 40);
    pop();
    i++;
  }

  fill(255);
  circle(x_co, y_co, 110);

  ellipse(x_co-20, y_co+120, 40, 20);
  ellipse(x_co+20, y_co+120, 40, 20);

  drawGrid(x_co, y_co, 55);

}


