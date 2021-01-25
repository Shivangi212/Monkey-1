var PLAY = 1;
var END = 0; 
var gameState = PLAY;

var survivalTime = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var invisibleGround;
var gameOver, gameOverImage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImage = loadImage("Game Over Pixel And Skull, Cartoon, Play, Concept PNG and Vector with Transparent Background for Free Download.jpg")
  
  bananaGroup = createGroup();
  
  obstacleGroup = createGroup();
 
}

function setup() {
  
  createCanvas(600,600);
  
  invisibleGround = createSprite(300,550,600,20);
  invisibleGround.x = invisibleGround.width / 2;
  
   monkey = createSprite(200,510,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  }


function draw() {
background("white");
  
  monkey.collide(invisibleGround);
  
  if (gameState === PLAY){
    
    spawnBananas();
  spawnObstacles();
    
    if (keyDown("space") && monkey.y >= 480) {
      monkey.velocityY = -12;
    }

    //add gravity
     monkey.velocityY = monkey.velocityY + 0.8;
  
  if (monkey.isTouching(bananaGroup)){
    score = score+1;
    bananaGroup.destroyEach();
  }
 
    if (monkey.isTouching(obstacleGroup)){
    
    gameState = END;
    
  }
  }
  
  if (gameState === END){
    
     bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    bananaGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    
    monkey.visible = false;
    invisibleGround.visible = false;
    
    gameOver = createSprite(300,300,10,10);
  gameOver.addImage(gameOverImage);
    gameOver.scale = 1.5;
  }
  
   drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 450,70);
  
  stroke("black");
  textSize(20);
  fill("black");
 survivalTime = survivalTime + Math.round(getFrameRate() / 60);
  text("Survival Time: "+ survivalTime, 70,70);
  
}

function spawnBananas(){
  if (frameCount % 80 === 0){
    var banana = createSprite(600,520,10,40);
    banana.y = Math.round(random(460,520));
    banana.addImage(bananaImage);
    banana.scale = 0.075;
    banana.velocityX = -(6 + 3 * score / 100);
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 520, 10, 40);
    obstacle.addImage(obstacleImage);
  obstacle.velocityX = -(6 + 3 * score / 100);
  obstacle.scale = 0.15;
  obstacle.lifetime = 200;
  
  obstacleGroup.add(obstacle);
}
}




