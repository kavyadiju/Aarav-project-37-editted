//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogimg,happyDogimg,gardenimg,bedroomimg,washroomimg,feedDog,sadimg,sadDog;
var LF=0;
var gameState;
function preload()
{
  //load images here
  dogimg = loadAnimation("images/dogImg.png");
  happyDogimg = loadAnimation("images/dogImg1.png");
  sadDogimg=loadImage("images/Happy.png");
  gardenimg=loadImage("images/Garden.png");
  washroomimg=loadImage("images/WashRoom.png");
  bedroomimg=loadImage("images/BedRoom.png");
  Hungry=loadImage("images/deadDog.png")
}

function setup() {
  database = firebase.database();
	createCanvas(1500,900);

  foodO=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })

  dog = createSprite(800,250);
  dog.addAnimation("dogim",dogimg);
  dog.addAnimation("dogi",happyDogimg)
  dog.scale=0.3;
  //dog.addImage(dogimg);

  feedButton=createButton("Feed");
  feedButton.position(900,300);
  feedButton.mousePressed(feedDog);

  addButton=createButton("Add Food");
  addButton.position(750,300);
  addButton.mousePressed((addFoodS));

  var currentTime=hour();
}


function draw() {  

background(46,139,87);
if(foodS===0){
  dog.changeAnimation("dogim",dogimg)
}
//foodO.display();
fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
  LF=data.val();
})
 
currentTime=hour();
if(currentTime<=(LF+1)){
  foodO.update("Playing");
  foodO.garden();
}
else if(currentTime===(LF+2)){
  foodO.update("Sleeping");
  foodO.bedroom();
}
else if(currentTime>(LF+2)&&currentTime<=(LF+4)){
  foodO.update("Bathing");
  foodO.garden();
}
else{
  foodO.update("Hungry");
  foodO.display();
}


 //deleted

if(gameState!=="Hungry"){// " was missing"
  feedButton.hide();
  addButton.hide();
  dog.visible=false;//editted
}
else{
  feedButton.show();
  addButton.show();
  dog.addAnimation("dogim",dogimg);
  dog.visible=true;//added
}
drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodO.updateFoodStock(foodS)
  /*if(foodS<0){
    foodS=0
  }*/
}
function feedDog(){
  dog.changeAnimation("dogi",happyDogimg);
  foodO.updateFoodStock(foodO.getFoodStock()-1);
  database.ref('/').update({
    Food:foodO.getFoodStock(),
  FeedTime:hour(),//editted
  gameState:"Hungry"
  })
}


function addFoodS(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}


/*function getState(){ // put it here
  var gameStateRef  = database.ref('gameState');
  gameStateRef.on("value",function(data){
     gameState = data.val();
  });
}*/




