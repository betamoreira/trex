var retMovendo, retFixo;

function setup() {
  createCanvas(1500,800);

  retFixo = createSprite(600,200,50,80);
  retFixo.shapeColor = "green";
  retFixo.debug = true;
  retMovendo = createSprite(400,800,80,30);
  retMovendo.shapeColor = "green";
  retMovendo.debug = true;

}

function draw() {
  background(0,0,0);

  console.log(retFixo.x - retMovendo.x);
  console.log(retMovendo.x - retFixo.x);  
  retMovendo.x = World.mouseX;
  retMovendo.y = World.mouseY;

  if(retMovendo.x - retFixo.x < retFixo.width/2 + retMovendo.width/2 && 
    retFixo.x - retMovendo.x < retFixo.width/2 + retMovendo.width/2){
    retFixo.shapeColor = "red";
    retMovendo.shapeColor = "red";
  }
  else{
    retFixo.shapeColor = "green";
    retMovendo.shapeColor = "green";
  }

  drawSprites();
}