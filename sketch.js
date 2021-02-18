var database;
var fish, fish_Img;
var bg;

function preload(){
  fish_Img=loadImage("fish.png");
  bg=loadImage("bg.jpg");
}

function setup(){
  canvas=createCanvas(1500,700);
  database=firebase.database();

  fish=createSprite(250,350);
  fish.addImage(fish_Img);
  fish.scale=0.5;

  var fishPosition=database.ref('fish/position');
  fishPosition.on("value",readPosition,showError);
}

function draw(){
  background(bg);

    if(keyDown(LEFT_ARROW)){
      writePosition(-8,0);
    } 
    else
    if(keyDown(RIGHT_ARROW)){
      writePosition(8,0);
    } 
    else
    if(keyDown(DOWN_ARROW)){
      writePosition(0,+8);
    } 
    else
    if(keyDown(UP_ARROW)){
      writePosition(0,-8);
    } 
    drawSprites();
}

function readPosition(data){
  position=data.val();
  fish.x=position.x;
  fish.y=position.y;
}

function writePosition(x,y){
  database.ref("fish/position").set({
      'x':position.x+x,
      'y':position.y+y
  })
}

function showError(){
  console.log("Error in DataBase");
}