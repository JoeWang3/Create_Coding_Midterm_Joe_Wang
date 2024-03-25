let sunFlowers = [];
let x = 0;
let fly = false;
let fly2 = false;
let sunrise; 
let sunset; 
let sunPosition; 
let t = 0; 
let x3 = -500;

function setup() {
  createCanvas(1200, 800);
  frameRate(10);
  sunrise = createVector(50, 150);
  sunset = createVector(1150, 150);
  sunPosition = sunrise.copy();
}

function draw() {
  background(color(173, 216, 230));

  let x2 = lerp(sunrise.x, sunset.x, t);
  let y = 150 - (sin(PI * t) * 100); 
  sunPosition.set(x2, y);
  let j = 0;
  // for(let i = 2000; i > 100; i -= 1){
  //   fill(253+0.001*j, 216-0.038*j, 25-0.0125*j);
  //   j += 1;
  //   ellipse(sunPosition.x, sunPosition.y, i, i);
  // }

  fill(255, 140, 0);
  noStroke();
  ellipse(sunPosition.x, sunPosition.y, 100, 100);

  // fill(color(173, 216, 230));
  // rect(0, 200, 1200, 800);


  t += 0.01;
  if (t > 1) {
    t = 0; 
  }
  sunFlowers = [];

  for(let i = 100; i < 1200; i += 200){
      let value = (sunPosition.x - i) / (650 - sunPosition.y);
      let sun_flower = new Sunflower(i, 650, 0.8, atan(value));
      sunFlowers.push(sun_flower);
  }
  for(let i = 200; i < 1200; i += 200){
    let value = (sunPosition.x - i) / (550 - sunPosition.y);
    let sun_flower = new Sunflower(i, 550, 0.6, atan(value));
    sunFlowers.push(sun_flower);
  }
  for(let i = 300; i < 1200; i += 200){
    let value = (sunPosition.x - i) / (450 - sunPosition.y);
    let sun_flower = new Sunflower(i, 450, 0.4, atan(value));
    sunFlowers.push(sun_flower);
  }

  for(let i = 400; i < 1200; i += 180){
    let value = (sunPosition.x - i) / (350 - sunPosition.y);
    let sun_flower = new Sunflower(i, 350, 0.3, atan(value));
    sunFlowers.push(sun_flower);
  }

  for(let i = 0; i < sunFlowers.length; i++){
    sunFlowers[i].display();
    // sunFlowers[i].move();
  }

  let bird = new Bird(x, 150, 0.7);
  x+=20;
  if(x>=1200){
    x = -1000;
  }
  if(fly == false){
    bird.displayUp();
    fly = true;
  }
  else{
    bird.displayDown();
    fly = false;
  }

  let bird2 = new Bird(x3, 200, 0.5);
  x3+=30;
  if(x3>=1200){
    x3 = -500;
  }
  if(fly == false){
    bird2.displayUp();
    fly2 = true;
  }
  else{
    bird2.displayDown();
    fly2 = false;
  }

  if(t <= 0.5){
    fill(0, 0, 0, 255-600*t); 
  }else{
    fill(0, 0, 0, 510*(t-0.5)); 
  }
  noStroke();
  rect(0, 0, width, height);

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
  constructor(x_co, y_co, scale, rotate){
    this.x_co = x_co;
    this.y_co = y_co;
    this.scale = scale;
    this.rotate = rotate;
  }
  display(){
    push();
    translate(this.x_co, this.y_co);
    scale(this.scale);

    stroke(0);
    line(0, 80, 0, 200);

    push();
    rotate(this.rotate); 

    noStroke();
    fill(color(252, 207, 49));
    let i = 4;
    for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
      if(angle == 3*PI/2){
        fill(color(232, 88, 5));
      }
      else{
        fill(color(252, 207, 49));
      }
      let x = cos(angle) * 60;
      let y = sin(angle) * 60;
      push();
      translate(x, y);
      rotate(radians(i*22.5));
      ellipse(0, 0, 20, 40);
      pop();
      i++;
    }

    pop();

    fill(255);
    circle(0, 0, 110);

    stroke(0);
    fill(color(160, 254, 101));
    ellipse(-20, 120, 40, 20);
    ellipse(20, 120, 40, 20);
    drawGrid(0, 0, 55);
    pop();
  }
  
}

// class Sunflower{
//   constructor(x_co, y_co, scale){
//     this.x_co = x_co;
//     this.y_co = y_co;
//     this.scale = scale;
//     this.angle = 0; 

//   }

//   move(){
//     this.angle = sin(frameCount / 5) * QUARTER_PI / 3;
//   }

//   display(){
//     push();
//     translate(this.x_co, this.y_co);
//     scale(this.scale);

//     stroke(0);
//     line(0, 80, 0, 200);

//     push();
//     rotate(this.angle); 

//     noStroke();
//     fill(color(252, 207, 49));
//     let i = 4;
//     for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
//       let x = cos(angle) * 60;
//       let y = sin(angle) * 60;
//       push();
//       translate(x, y);
//       rotate(radians(i*22.5));
//       ellipse(0, 0, 20, 40);
//       pop();
//       i++;
//     }

//     fill(255);
//     circle(0, 0, 110);
//     pop(); 
    
//     stroke(0);
//     fill(color(160, 254, 101));
//     ellipse(-20, 120, 40, 20);
//     ellipse(20, 120, 40, 20);
//     drawGrid(0, 0, 55);
//     pop();
//   }
// }


class Bird{
  constructor(x_co, y_co, scale){
    this.x = x_co;
    this.y = y_co;
    this.scale = scale;
  }
  displayUp(){
    push();
    translate(this.x, this.y);
    scale(this.scale);
    noStroke();
    // beak
    fill(color(252, 207, 49));
    triangle(200, 63, 165, 60, 165, 70);
    // tail
    triangle(58, 56, 23, 40, 23, 72);
    // head
    fill(color(82, 159, 231));
    ellipse(150, 67, 39, 33);
    // body
    arc(100, 50, 100, 100, 0, PI);
    // eye
    fill(255);
    arc(153, 60, 18, 18, 0, PI);
    fill(0);
    arc(153, 60, 12, 12, 0, PI);
    // wing
    fill(color(252, 207, 49));
    arc(94, 42, 65, 65, QUARTER_PI, PI+QUARTER_PI);
    pop();
  }
  displayDown(){
    push();
    translate(this.x, this.y);
    scale(this.scale);
    noStroke();
    // beak
    fill(color(252, 207, 49));
    triangle(200, 63, 165, 60, 165, 70);
    // tail
    triangle(58, 56, 23, 40, 23, 72);
    // head
    fill(color(82, 159, 231));
    ellipse(150, 67, 39, 33);
    // body
    arc(100, 50, 100, 100, 0, PI);
    // eye
    fill(255);
    arc(153, 60, 18, 18, 0, PI);
    fill(0);
    arc(153, 60, 12, 12, 0, PI);
    // wing
    fill(color(252, 207, 49));
    arc(135, 90, 65, 65, QUARTER_PI, PI+QUARTER_PI);
    pop();
  }

  
}

