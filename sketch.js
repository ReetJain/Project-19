var bananaImage, stoneImage, stoneGroup, background, score;



function preload() {
    
    backImage = loadImage("jungle.jpg");
    
    player_running = loadAnimation(
        
        "Monkey_01.png", "Monkey_02.png", "Monkey_03.png", 
        "Monkey_04.png", "Monkey_05.png", "Monkey_06.png",
        "Monkey_07.png", "Monkey_08.png", "Monkey_09.png",
        "Monkey_10.png"
    );

    bananaImage = loadImage("banana.png");
    
    stoneImage = loadImage("stone.png");  
    
}

function setup() {
    
    createCanvas(windowWidth, windowHeight);

    back = createSprite(width/2, height/2.2, width, height);
    back.addImage(backImage);
    back.scale = 2;
    back.velocityX = -6;
    back.x = back.width/2;
    backImage.resize(windowWidth, windowHeight);


    monkey = createSprite(300, 500, 20, 20);
    monkey.addAnimation("player", player_running);
    monkey.scale = 0.3;

    invisible = createSprite(width/2, height+35, width, 165);
    invisible.visible = false;

    bananaGroup = new Group();
    stoneGroup = new Group();

    score = 0;

    gameState = "play";

}  

function draw() {
    
    background(255);

    monkey.collide(invisible);

    if (gameState === "play") {
        
      if(back.x < 0) {
        back.x = back.width/2;
      }

      if (keyDown("space") && monkey.y >= 1) {
        monkey.velocityY = -12;
      }

      monkey.velocityY = monkey.velocityY+0.8;


      if (monkey.isTouching(bananaGroup)) {
        bananaGroup.destroyEach();

        score = score+2;
      }

      switch(score) {
        case 10: monkey.scale = 0.35;
        break;
        case 20: monkey.scale = 0.40;
        break;
        case 30: monkey.scale = 0.45;
        break;
        default: break;
      }

      createFood();

      createStone();

      if (monkey.isTouching(stoneGroup)) {
        gameState = "end";
      }
      
    }

    if (gameState === "end") {
        stoneGroup.setLifetimeEach(-1);
        stoneGroup.setVelocityXEach(0);

        back.velocityX = 0;
    }

    drawSprites();

    fill(255);
    textSize(24);
    text("Score: "+score,40,40);


}

function createFood() {
    
    if (frameCount % 100 === 0) {
        banana = createSprite(width+20,200);
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        banana.velocityX = -15;
        banana.lifetime = 140;
        bananaGroup.add(banana);
    }

}

function createStone() {
    
    if (frameCount % 150 === 0) {
        stone = createSprite(width+20,530);
        stone.addImage(stoneImage);
        stone.scale = 0.3;
        stone.velocityX = -15;
        stone.lifetime = 140;
        stoneGroup.add(stone);
    }

}
