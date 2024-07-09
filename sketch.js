let pipes = [];
let score = 0;
let gameOver = false;
let backgroundImage;
let backgroundX = 0;
let gameStarted = false;
let speed = 10; // Adjust the speed as needed
let gameState = 'landing';

function preload() {
  // backgroundImage = loadImage('11.png');
  landing = loadImage('land.png');
  instruction = loadImage('instructions.png');
  caramel = loadImage("caramel.PNG");
  palm1 = loadImage("palm2-1.PNG");
  palm2 = loadImage("palm2 -2.PNG");
  ending = loadImage("score2.png");
  NYUAD = loadImage("NYUAD.png");
  
  // Load the jump sound
  jumpSound = loadSound('sfx_point.mp3');
  // hitSound = loadSound('sfx_hit.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird(); 
}

function draw() {
  if (gameState === 'game') {
    background(156,207,216,255);
    // fill(207,207,207,255);
    // rect(150,150, 500, 300);
    // ellipse(400,150, 490, 100)
    
    // strokes for the building 
//    fill(169, 169, 169)
//     rect(150, 220, 500, 10);
//     rect(150, 235, 500, 10);
//     rect(150, 250, 500, 10);
//     rect(150, 265, 500, 10);
//     rect(150, 280, 500, 10);
//     rect(150, 295, 500, 10);
//     // rect(200, 220, 10, 100);
//     rect(260, 220, 10, 100);
//     rect(320, 220, 10, 100);
//     rect(380, 220, 10, 100);
//     rect(440, 220, 10, 100);
//     rect(500, 220, 10, 100);

    
//     image(NYUAD, 55, 0);
//     fill(171,109,51,255);
//     rect(150, 300, 510, 100);
    
    
//     fill(121,68,19,255);
//     rect(150, 310, 500, 5);
//     rect(150, 317, 500, 5);
//     rect(150, 324, 500, 5);
//     rect(150, 331, 500, 5);
    
//     rect(150, 390, 500, 20);
    

    
//     // the 2 buildings
//     fill(115,115,115,255);
//     noStroke();
//     square(0, 250, 200);
//     square(600, 250, 200);
    
//     // windows 
//     fill(207,207,207,255);
//     rect(20,260, 40, 50)
//     rect(70,260, 40, 50)
//     rect(120, 260, 40, 50)
//     rect(640, 260, 40, 50)
//     rect(690, 260, 40, 50)
//     rect(740, 260, 40, 50)
  
//         noStroke();
//     fill(255);
//     // First Cloud
//     ellipse(200, 100, 80, 60);
//     ellipse(240, 100, 100, 80);
//     ellipse(290, 100, 80, 60);
//     ellipse(220, 80, 70, 50);
//     ellipse(260, 80, 90, 70);

//     // Second Cloud
//     ellipse(400, 80, 60, 40);
//     ellipse(440, 80, 80, 60);
//     ellipse(490, 80, 60, 40);
//     ellipse(420, 60, 50, 30);
//     ellipse(460, 60, 70, 50);

//     // Third Cloud
//     ellipse(600, 120, 90, 70);
//     ellipse(640, 120, 110, 90);
//     ellipse(690, 120, 90, 70);
//     ellipse(630, 100, 80, 60);
//     ellipse(670, 100, 100, 80);
    
//     ellipse(0, 80, 60, 40);
//     ellipse(40, 80, 80, 60);
//     ellipse(90, 100, 60, 40);
//     ellipse(140, 150, 50, 30);
    
//     fill(15,138,70,255);
//     ellipse(100, 420, 90, 70);
//     ellipse(60, 450, 90, 70);
//     ellipse(140, 420, 110, 90);
//     ellipse(190, 420, 90, 70);
//     ellipse(130, 500, 80, 60);
//     ellipse(170, 500, 100, 80);
    
//     ellipse(600, 420, 90, 70);
//     ellipse(640, 420, 110, 90);
//     ellipse(690, 420, 90, 70);
//     ellipse(630, 500, 80, 60);
//     ellipse(670, 500, 100, 80);
    
    
//     fill(0,166,81,255);
//     ellipse(0, 420, 90, 70);
//     ellipse(40, 420, 110, 90);
//     ellipse(90, 420, 90, 70);
//     ellipse(30, 500, 80, 60);
//     ellipse(70, 500, 100, 80);
//     ellipse(670, 420, 90, 70);
//     ellipse(700, 420, 110, 90);
//     ellipse(740, 420, 90, 70);
//     ellipse(750, 500, 80, 60);
//     ellipse(760, 500, 100, 80);
    
    // image(backgroundImage, backgroundX, 0, backgroundImage.width, height);
    if (!gameOver) {
      bird.update();
      bird.show();
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].hits(bird)) {
          gameOver = true;
        }
        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
      }
      if (frameCount % 15 === 0) {
        pipes.push(new Pipe());
      }
      textSize(32);
      fill(255);
      text(score, 100, 30);
      for (let i = pipes.length - 1; i >= 0; i--) {
        if (pipes[i].pass(bird)) {
          score++;
        }
      }
    } else {
      image(ending, 0, 0, width, height);
      textSize(64);
      fill(255, 0, 0);
      text("", 200, height / 2 - 32);
      textSize(50);
      fill(0);
      text("" + score, width/2 , height / 2);
      // Provide a restart option

      // Check for restart key press
      if (keyIsDown(32)) { // SPACE key
        restart();
      } else if (keyIsDown(66)) { // 'B' key
        gameState = 'landing';
      }
    }
  } else if (gameState === 'landing') {
    background(0);
    image(landing, 0, 0, width, height);
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("", width / 2, height / 2);
    // Check for start key press (SPACE key) or 'i' key press for instructions
    if (keyIsDown(32)) { // SPACE key
      startGame();
    } else if (keyIsDown(73)) { // 'i' key
      gameState = 'instruction';
    }
  } else if (gameState === 'instruction') {
    background(0);
    image(instruction, 0, 0, width, height);
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    if (keyIsDown(32)) { // Check for SPACE key press
      startGame();
    }
  }
}

function startGame() {
  gameState = 'game';
  gameStarted = true;
  bird = new Bird();
  pipes = [];
  score = 0;
  gameOver = false;
}

function restart() {
  startGame();
}

function keyPressed() {
  if (keyIsDown(UP_ARROW) && !gameOver && gameState === 'game') {
    bird.jump();
     jumpSound.play();
  }
}

function restartGame() {
  bird = new Bird();
  pipes = [];
  score = 0;
  gameOver = false;
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    noFill();
    ellipse(this.x, this.y, 32, 32);
    image(caramel, this.x - 70, this.y - 30, 150, 90);
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  jump() {
    this.velocity += this.lift;
  }
}

class Pipe {
  constructor() {
    this.top = random(height / 2.5);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 20;
    this.speed = speed; // Adjust the speed here as well
    this.highlight = false;
  }

  show() {
    fill(106, 69, 46, 255);
    if (this.highlight) {
      fill(106, 69, 46, 255);
      noStroke();
    }
    rect(this.x - 8, 0, this.w + 6, this.top);
    rect(this.x, height - this.bottom, this.w + 2, this.bottom);
    const palmX = this.x - 82;
    const palmYTop = this.top - 250;
    const palmYBottom = height - this.bottom - 120;
    image(palm2, palmX - 20, palmYTop + 195, 200, 200);
    image(palm1, palmX, palmYBottom, 200, 200);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  pass(bird) {
    if (bird.x > this.x && !this.highlight) {
      return true;
    }
    return false;
  }
}
