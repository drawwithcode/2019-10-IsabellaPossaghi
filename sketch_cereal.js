var cereals = [];

function preload() {

  inconsolata = loadFont("./assets/Inconsolata.otf")
  tex = loadImage("./assets/cereal.jpeg")
  //3D models
  bowl = loadModel("./assets/bowl.obj", true)
  spoon = loadModel("./assets/spoon.obj", true)

  for (var i = 0; i < 250; i++) {
    cereals.push(new Cereal());
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  //i put the text in draw function because otherwise it will be covered by the background
  textFont(inconsolata)
  textAlign(CENTER, CENTER);


}

function draw() {

  background(253, 245, 230)

  //create a vector to change light and shadows
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let v = createVector(dx, dy, 0);
  v.div(100);

  if (mouseIsPressed) {
    ambientLight(160,  82,  45);
    directionalLight(222, 184, 135, v, v);
    pointLight(10, 10, 10);

  } else {
    ambientLight(244, 164, 96);
    directionalLight(244, 164, 96, v, v);
    pointLight(10, 10, 10);
  }




  for (var i = 0; i < cereals.length; i++) {
    cereals[i].move();
    cereals[i].display();
  }

  //text
  fill(0)
  textSize(width / 50);
  text("torus cereals", 0, -200);
  textSize(width / 80);
  text("use the mouse to change light + flavour", 0, 200);


  //bowl + spoon
  fill(255)
  noStroke()
  scale(1.5);
  translate(0, 0, -50)
  model(bowl)
  translate(80, 0, 90)
  rotateY(150)
  model(spoon)

}

function Cereal() {

  this.x = random(-800, 800);
  this.y = random(-800, 800);
  this.z = random(-10, 100);
  this.angle = random(0, 3.14);
  this.diameter = random(5, 20);
  this.speed = random(0.01, 0.07);

  this.move = function() {
    this.angle += this.speed;
  };

  this.display = function() {

    push();
    translate(this.x, this.y, this.z);
    rotateX(this.angle);
    rotateY(this.angle / 4);
    rotateZ(this.angle / 3);
    noStroke();
    //ambientMaterial(255, 255, 255);
    texture(tex)
    torus(this.diameter, this.diameter / 2);
    pop();

  };

}
