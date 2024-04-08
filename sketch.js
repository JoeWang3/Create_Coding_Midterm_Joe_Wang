let sunFlowers = [];
let x = 0;
let fly = false;
let fly2 = false;
let sunrise; 
let sunset; 
let moonrise;
let moonset;
let sunPosition; 
let moonPosition;
let t = 0; 
let m = 0;
let x3 = -500;
let clouds = [];
let stars = [];
let fireflies = [];
let meteors = [];

function setup() {
  createCanvas(1200, 800);
  frameRate(10);
  sunrise = createVector(50, 150);
  sunset = createVector(1150, 150);
  moonrise = createVector(50, 150);
  moonset = createVector(1150, 150);
  sunPosition = sunrise.copy();
  moonPosition = moonrise.copy();
  for(let i = 0; i < 800; i += 300){
    let cloud = new Cloud(i, random(30, 80), random(5, 15));
    clouds.push(cloud);
  }
  for(let i = 0; i < 100; i += 1){
    let star = new Star(random(0, 1200), random(0, 300), random(1, 5));
    stars.push(star);
  }
  for(let i = 0; i < 25; i += 1){
    let ff = new Firefly(random(200, 600), random(500, 800), createVector(random(-2, 2), random(-2, 2)), createVector(random(-0.05, 0.05), random(-0.05, 0.05)));
    fireflies.push(ff);
  }
  for (let i = 0; i < 20; i++) {
    meteors.push(new Meteor());
  }

}

function draw() {

  background(color(173, 216, 230));
  // daytime
  if(t > -0.1){
    for(let i = 0; i < clouds.length; i++){
      clouds[i].speed = random(5, 15);
    }
    x += 20;
    x3 += 30;
    if(x>=1200){
      x = -1000;
    }
    if(x3>=1200){
      x3 = -500;
    }
  }
  // nighttime
  else{
    for(let i = 0; i < clouds.length; i++){
      clouds[i].speed = random(3, 5);
    }
    if(x > 0){
      x += 20;
      if(x>=1200){
        x = -1000;
      }
    }
    if(x3 > 0){
      x3 += 30;
      if(x3>=1200){
        x3 = -500;
      }
    }


    

  }

  if (t >= 0){
    m = t-1;
  }else{
    m = t+1;
  }

  // draw the sun
  let x2 = lerp(sunrise.x, sunset.x, t);
  let y = 150 - (sin(PI * t) * 100); 
  sunPosition.set(x2, y);
  let j = 0;
  for(let i = 150; i > 100; i -= 1){
    fill(253+0.04*j, 216-1.52*j, 25-0.5*j);
    j += 1;
    ellipse(sunPosition.x, sunPosition.y, i, i);
  }
  fill(255, 140, 0);
  noStroke();
  ellipse(sunPosition.x, sunPosition.y, 100, 100);


  // draw the cloud;
  for(let i = 0; i < clouds.length; i++){
    clouds[i].display();
  }
  
  

  // draw the sunflowers
  sunFlowers = [];
  for(let i = 300; i < 1200; i += 200){
      let value = (sunPosition.x - i) / (650 - sunPosition.y);
      let sun_flower = new Sunflower(i, 650, 0.8, atan(value));
      sunFlowers.push(sun_flower);
  }
  for(let i = 400; i < 1200; i += 200){
    let value = (sunPosition.x - i) / (550 - sunPosition.y);
    let sun_flower = new Sunflower(i, 550, 0.6, atan(value));
    sunFlowers.push(sun_flower);
  }
  for(let i = 500; i < 1200; i += 200){
    let value = (sunPosition.x - i) / (450 - sunPosition.y);
    let sun_flower = new Sunflower(i, 450, 0.4, atan(value));
    sunFlowers.push(sun_flower);
  }

  for(let i = 600; i < 1200; i += 180){
    let value = (sunPosition.x - i) / (350 - sunPosition.y);
    let sun_flower = new Sunflower(i, 350, 0.3, atan(value));
    sunFlowers.push(sun_flower);
  }

  for(let i = 0; i < sunFlowers.length; i++){
    sunFlowers[i].display();
    // sunFlowers[i].move();
  }

  // draw the bird
  let bird = new Bird(x, 150, 0.7, color(82, 159, 231), color(252, 207, 49));
  if(fly == false){
    bird.displayUp();
    fly = true;
  }
  else{
    bird.displayDown();
    fly = false;
  }

  let bird2 = new Bird(x3, 200, 0.5, color(82, 159, 231), color(252, 207, 49));
  if(fly == false){
    bird2.displayUp();
    fly2 = true;
  }
  else{
    bird2.displayDown();
    fly2 = false;
  }

  
  if(t > -0.1){
    // change the lightness of the scene
    if(t <= 0.4){
      fill(0, 0, 0, 170-(t+0.1)*340); 
    }else if(t >= 0.6){
      fill(0, 0, 0, (t-0.6)*425); 
    }else{
      fill(0, 0, 0, 0);
    }
    noStroke();
    rect(0, 0, width, height);
  }else{
    fill(0, 0, 0, 170); 
    rect(0, 0, width, height);
  }

  // draw the moon
  let x_moon = lerp(moonrise.x, moonset.x, m);
  let y_moon = 150 - (sin(PI * m) * 100); 
  moonPosition.set(x_moon, y_moon);
  fill(255);
  noStroke();
  ellipse(moonPosition.x, moonPosition.y, 130, 130);

  if(t <= -0.1){
    for(let i = 0; i < stars.length; i++){
      stars[i].display();
    }

    for(let i = 0; i < fireflies.length; i++){
      fireflies[i].display();
    }
    for (let i = 0; i < meteors.length; i++) {
      meteors[i].move();
      meteors[i].display();
    }

  }

  // control the time
  t += 0.005;
  if (t >= 1) {
    t = -1; 
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
        fill(color(253, 131, 25));
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
  constructor(x_co, y_co, scale, bodyColor, wingColor){
    this.x = x_co;
    this.y = y_co;
    this.scale = scale;
    this.bodyColor = bodyColor;
    this.wingColor = wingColor;
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
    fill(this.bodyColor);
    ellipse(150, 67, 39, 33);
    // body
    arc(100, 50, 100, 100, 0, PI);
    // eye
    fill(255);
    arc(153, 60, 18, 18, 0, PI);
    fill(0);
    arc(153, 60, 12, 12, 0, PI);
    // wing
    fill(this.wingColor);
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
    fill(this.bodyColor);
    ellipse(150, 67, 39, 33);
    // body
    arc(100, 50, 100, 100, 0, PI);
    // eye
    fill(255);
    arc(153, 60, 18, 18, 0, PI);
    fill(0);
    arc(153, 60, 12, 12, 0, PI);
    // wing
    fill(this.wingColor);
    arc(135, 90, 65, 65, QUARTER_PI, PI+QUARTER_PI);
    pop();
  }
}

class Grass{

}

class Cloud{
  constructor(x_co,y_co, speed){
    this.x_co = x_co;
    this.y_co = y_co;
    this.speed = speed;
  }
  display(){
    this.x_co += this.speed;
    if(this.x_co > 1200){
      this.x_co = -100;
    }
    noStroke();
    push();
    translate(this.x_co, this.y_co);
    fill(255);
    ellipse(100, 100, 60, 60); 
    ellipse(150, 100, 70, 70); 
    ellipse(200, 100, 60, 60); 
    ellipse(125, 80, 80, 80); 
    ellipse(175, 80, 80, 80);
    pop();
  }
}

class Star{
  constructor(x_co, y_co, size){
    this.x_co = x_co;
    this.y_co = y_co;
    this.size = size;
  }
  display(){
    let chance = random(0, 3);
    if(chance < 2.5){
      fill(255);
      ellipse(this.x_co, this.y_co, this.size, this.size);
    }
    // fill(255);
    // ellipse(this.x_co, this.y_co, this.size, this.size);
  }
}

class Firefly{
  constructor(x_co, y_co, speed, acc){
    this.x_co = x_co;
    this.y_co = y_co;
    this.speed = speed;
    this.acc = acc;
  }
  display() {
    this.x_co += this.speed.x;
    this.y_co += this.speed.y;
    this.speed.x += this.acc.x;
    this.speed.y += this.acc.y;
    this.speed = createVector(random(-2, 3), random(-3, 3));
    this.acc = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
  
    for(let i = 8; i > 0; i--){
      fill(255, 255, 0, 255 - 30 * i);
      ellipse(this.x_co, this.y_co, i*1.5 , i *1.5); 
    }
  }
  
}

class Meteor {
  constructor() {
    this.x_co = random(width);
    this.y_co = 0;
    this.size = random(3, 6);
    this.speed = random(1, 5);
  }

  display() {
    if(this.y_co < 300){
    fill(255);
    ellipse(this.x_co, this.y_co, this.size, this.size);
    stroke(255);
    line(this.x_co, this.y_co, this.x_co - this.size*3, this.y_co - this.size*3);
    noStroke();
    }
  }

  move() {
    this.x_co += this.speed / 2; 
    this.y_co += this.speed; 
    if (this.y_co > height) {
      this.x_co = random(width);
      this.y_co = -this.size;
      this.size = random(5, 10);
      this.speed = random(1, 5);
    }
  }
}
