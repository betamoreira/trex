var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trex_correndo, solo, imagemdosolo, soloinvisivel;
var nuvem, imagemdanuvem;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var grupodeobstaculos, grupodenuvens, trex_colidiu;
var fimdejogo, fimdejogoimg, reinciarjogo, reiniciarjogoimg;
var somSalto, somMorte, somPoint;

function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud2.png");
  
  obstaculo1 = loadImage("obstacle1.png"); 
  obstaculo2 = loadImage("obstacle2.png"); 
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  fimdejogoimg = loadImage("gameOver.png");
  reiniciarjogoimg = loadImage("restart.png");
  
  somSalto = loadSound("jump.mp3");
  somMorte = loadSound("die.mp3");
  somPoint = loadSound("checkPoint.mp3");

}

function setup(){
  createCanvas( windowWidth,windowHeight);
  
  var mensagem = "Isso é uma mensagem";
  console.log(mensagem);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided",trex_colidiu);
  trex.scale = 0.5;
  //trex.setCollider("rectangle", 0, 0, 400, trex.width, trex.height);
  trex.setCollider("circle",0,0,40);
  //trex.debug = true;
  
  /*solo = createSprite(width/2,height-50,width,2);
  solo.addImage("ground", imagemdosolo);
  solo.x = solo.width/2;
  
  soloinvisivel = createSprite(width/2,height+50,width,125);
  soloinvisivel.visible = false;
  
  fimdejogo = createSprite(300,100);
  fimdejogo.addImage(fimdejogoimg);
  fimdejogo.scale = 0.5;
  
  reiniciarjogo = createSprite(300,140);
  reiniciarjogo.addImage(reiniciarjogoimg);
  reiniciarjogo.scale = 0.5;*/
  
  
  soloinvisivel = createSprite(width/2,height-10,width,125);  
  soloinvisivel.visible = false;
  
  solo = createSprite(width/2,height-100,width,2);
  solo.addImage("ground",imagemdosolo);
  solo.x = width/2
  //solo.velocityX = -(6 + 3*pontuacao/100);
  
  fimdejogo = createSprite(width/2,height/2- 50);
  fimdejogo.addImage(fimdejogoimg);
  
  reiniciarjogo = createSprite(width/2,height/2);
  reiniciarjogo.addImage(reiniciarjogoimg);
  
  fimdejogo.scale = 0.5;
  reiniciarjogo.scale = 0.5;

  fimdejogo.visible = false;
  reiniciarjogo.visible = false;
  
  grupodeobstaculos = new Group();
  grupodenuvens = new Group();
  
  console.log("Oi "+5);
  
  pontuacao = 0;
}

function draw(){
  background("white");
  
  //console.log(mensagem);
  
  //console.log("Isto é: "+estadoJogo);
  
  text("Score: "+pontuacao, 30,50);
  
  if(estadoJogo === JOGAR){
    fimdejogo.visible = false;
    reiniciarjogo.visible = false;
    
    solo.velocityX = -(4 + 3*pontuacao/100);
    
    pontuacao = pontuacao + Math.round(getFrameRate()/60);
    
    if(pontuacao>0 && pontuacao%100 ===0){
    //  somPoint.play();
    }
    
    if(solo.x<0){
     solo.x = solo.width/2;
  }
  
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120){
      trex.velocityY = -12;
      somSalto.play();
      touches=[];
    }

    trex.velocityY = trex.velocityY + 0.8;

    gerarNuvens();
    gerarObstaculos();
    
    if(grupodeobstaculos.isTouching(trex)){
      //trex.velocityY = -12;
      //somSalto.play();
      estadoJogo = ENCERRAR;
      somMorte.play();
    }
  }
  else if(estadoJogo === ENCERRAR){
    fimdejogo.visible = true;
    reiniciarjogo.visible = true;
    
    solo.velocityX = 0;
    trex.velocityY = 0;
    
    trex.changeAnimation("collided", trex_colidiu);
    
    grupodeobstaculos.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);
    
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    
    if(mousePressedOver(reiniciarjogo)){
    reset();
  }
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
}
  
  trex.collide(soloinvisivel);
  
  drawSprites();
}

function reset(){
  estadoJogo = JOGAR;
  
  fimdejogo.visible = false;
  reiniciarjogo.visible = false;
  
  grupodeobstaculos.destroyEach();
  grupodenuvens.destroyEach();
  
  trex.changeAnimation("running", trex_correndo);
  
  pontuacao = 0;
}

function gerarNuvens(){
  if(frameCount%60===0){
    nuvem = createSprite(width+20,height-300,40,10);
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.6;
    nuvem.y = Math.round(random(10,60));
    nuvem.velocityX = -3;
    nuvem.lifetime = 200;
    
    nuvem.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //console.log(nuvem.depth);
    //console.log(trex.depth);
    
    grupodenuvens.add(nuvem);
  }
}

function gerarObstaculos(){
  if(frameCount%60===0){
    obstaculo = createSprite(width,height-95,20,30);
    obstaculo.velocityX = - (6 + pontuacao/100);
    
    var num = Math.round(random(1,6));
    
    switch(num){
      case 1: obstaculo.addImage(obstaculo1);
      break;
      case 2: obstaculo.addImage(obstaculo2);
      break;
      case 3: obstaculo.addImage(obstaculo3);
      break;
      case 4: obstaculo.addImage(obstaculo4);
      break;
      case 5: obstaculo.addImage(obstaculo5);
      break;
      case 6: obstaculo.addImage(obstaculo6);
      break;
      default: break;
    }
    
    obstaculo.scale = 0.6;
    obstaculo.lifetime = 300;
    
    grupodeobstaculos.add(obstaculo);
  }
}
