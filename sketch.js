let sunFlowers = [];
function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background(255);
  for(let i = 100; i < 1200; i += 200){
    for(let j = 100; j < 800; j += 250){
      let sun_flower = new Sunflower(i, j, 1);
      sunFlowers.push(sun_flower);
    }
  }
  for(let i = 0; i < sunFlowers.length; i++){
    sunFlowers[i].display();
  }



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


class Sunflower{
  constructor(x_co, y_co, scale){
    this.x_co = x_co;
    this.y_co = y_co;
    this.scale = scale;
  }
  display(){
    stroke(0);
    line(this.x_co, this.y_co+80, this.x_co, this.y_co+200);

    noStroke();
    fill(color(252, 207, 49));
    let i = 4;
    for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
      let x = this.x_co + cos(angle) * 60;
      let y = this.y_co + sin(angle) * 60;
      push();
      translate(x, y);
      rotate(radians(i*22.5));
      ellipse(0, 0, 20, 40);
      pop();
      i++;
    }

    fill(255);
    circle(this.x_co, this.y_co, 110);

    stroke(0);
    fill(color(160, 254, 101));
    ellipse(this.x_co-20, this.y_co+120, 40, 20);
    ellipse(this.x_co+20, this.y_co+120, 40, 20);

    drawGrid(this.x_co, this.y_co, 55);

  }
  
}

