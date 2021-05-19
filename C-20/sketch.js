var knight, knightImg 
var obstacle
var obstacle1
var obstacle2
var obstacle3
var obstacle4 
var obstacle5
var castle, castleImg 
var zombie, zombieImg
var invisGround 
var PLAY = 1
var END = 0
var gameState = PLAY 
var jewl, jewlImg
var score 
var gameOver, gameOverImg
var blackImg 

function preload(){
knightImg = loadAnimation("knight1.png","k1.png","knight3.png","knight4.png",)
castleImg = loadImage("Background.png")
zombieImg = loadAnimation("zom1.png","zom2.png","zom3.png", "zom4.png", "zom5.png")
obstacle1 = loadImage("ob1.png")
obstacle2 = loadImage("ob2.png")
obstacle3 = loadImage("ob3.png")
obstacle4 = loadImage("ob4.png")
obstacle5 = loadImage("ob5.png")
jewlImg = loadImage("jewl.png")
gameOverImg = loadImage("gameOver.png")
blackImg = loadImage("black_background.png")

}

function setup() {
  createCanvas(1400,600);
  castle= createSprite(100,300)
  castle.addImage("bg", castleImg)
  castle.scale = 0.7
  knight = createSprite(400, 415,50,50)
  knight.addAnimation("person", knightImg)
  knight.scale = 0.2
  

  zombie = createSprite(100,400)
  zombie.addAnimation("WER", zombieImg)
  zombie.scale = 0.1
  invisGround = createSprite(700,490,1400,1)
  invisGround.visible = false
  
  gameOver = createSprite(700,260,30,30)
  gameOver.addImage("eat", gameOverImg)
  gameOver.scale = 1
  
  obstaclesGroup = createGroup();
  jewlsGroup = createGroup()
  score = 0 
}

function draw() {
  background("grey")
  text("Score: "+ score, 500,500);

  gem()
  obstacles()
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    castle.velocityX = -8
    if (castle.x < 0){
      castle.x = castle.width/3;
    }  
    knight.velocityY = knight.velocityY + 0.9
 if(keyDown("space")&& knight.y >=400) {
       knight.velocityY = -18;
  }
  if(knight.isTouching(jewlsGroup)){
jewl.destroy()
  }
  
  knight.setCollider("rectangle",-100,50,500,700)
  //knight.debug = true
  
  knight.collide(invisGround)
  
  if(obstaclesGroup.isTouching(knight)){
    gameState = END
    
    
    
  }

     
   } else if(gameState === END){
    castle.velocityX = 0
    gameOver.visible = true
    
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.destroyEach();
    knight.velocityY = 0
    knight.destroy()
    zombie.destroy()
    jewlsGroup.destroyEach()
    
    
   }
   
   
   
   
  drawSprites();
}
function gem (){
  if(frameCount % 120 === 0){
    jewl = createSprite(1300,490,30,30)
    jewl.y = Math.round(random(500,300))
    jewl.velocityX = -8
    jewl.addImage("ruby",jewlImg)
    
    jewl.scale = 0.15
    jewlsGroup.add(jewl)
  }
 
  }
  
function obstacles(){

  if (frameCount % 100 === 0){
  obstacle = createSprite(1300,490,30,30)
  obstacle.velocityX = -8
  var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage("o1",obstacle1);
      obstacle.scale = 0.1
      //obstacle.debug = true
      obstacle.setCollider("rectangle",0,100,810,600)
              break;
      case 2: obstacle.addImage("o2",obstacle2);
      obstacle.scale = 0.3
      //obstacle.debug = true
              break;
      case 3: obstacle.addImage("o3",obstacle3);
      obstacle.scale = 0.3
      //obstacle.debug = true
              break;
      case 4: obstacle.addImage("o4",obstacle4);
      obstacle.scale = 0.3
      //obstacle.debug = true
              break;
      case 5: obstacle.addImage("o5",obstacle5);
      obstacle.scale = 0.7
      //obstacle.debug = true
              break;
      default: break;
  
      
  
  
}
obstaclesGroup.add(obstacle)
  
}
}

