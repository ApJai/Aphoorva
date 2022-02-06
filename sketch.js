var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;
var gameOver;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  gameOverImg = loadImage("gameOver.png");  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,150,100,420);
  ocean.addImage("ocean",oceanImg);  
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  

  //create coin group and climber group
  climbersGroup = new Group();
  coinGroup = new Group();
 
  score = 0;  
  
}

function draw(){
  background(0);

  fill("yellow");
  textSize(20);  
  text("Score: "+score, 240,60);
     
  text("score",50, 200 , 400);

  if (gameState === "play") {
    ocean.setVelocity(0,0.5);

    if(ocean.y > 300) {
      ocean.y = 150;
    }
    
    spawnCoin();

    if(keyDown("space")){
      frog.y = frog.y - 10
    }else{
      frog.y = frog.y + 3 
    }

    if(frog.x > 0 && keyDown("left")){
      frog.x = frog.x - 10
    }
    
    if(frog.x < 540 && keyDown("right")){
      frog.x = frog.x + 10
    }

    if(frog.isTouching(coinGroup)){
      score = score + 1;
      coin.lifetime = 0;      
    };

    if(frog.isTouching(climbersGroup)){
      frog.setVelocity(0,1)      
    };

    if(frog.y > 480){
      gameState = "end"
    }    
  }
  
  if (gameState === "end"){
    ocean.velocityy = 0;    
    gameOver = createSprite(200,200,50,50);
    gameOver.scale = 0.1;
    gameOver.addImage("frog", gameOverImg);  
    climbersGroup.destroyEach();
    coinGroup.destroyEach();
  }
  
  drawSprites();
}  


// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    
    grass = createSprite(Math.round(random(50,450)),0,50,50);
    grass.addImage("grass", climberImg );
    grass.scale = 0.5;
    grass.setVelocity(0,1);
    grass.lifetime = 500;
    climbersGroup.add(grass);
    
    coin = createSprite(grass.x,-50,50,50);
    coin.scale = 0.1;
    coin.addImage("coin", coinImg ); 
    coin.setVelocity(0,1);
    coin.lifetime = 450; 
    coinGroup.add(coin);
  } 

}

