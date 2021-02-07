class Food{
    constructor(){
        this.foodStock=0;;
        this.lastFed;
      this.image=loadImage("images/Milk .png")
    }
    updateFoodStock(FS){
      this.foodStock=FS;
    }
    getFedTime(LF){
      this.lastFed=LF
    }
    deductFood(){  // added a block
      if(this.foodStock>0){
       this.foodStock=this.foodStock-1;
      }
     }
     getFoodStock(){
      return this.foodStock;
    }

    update(state){ // put it here
      database.ref('/').update({
        gameState: state
      });
    }

  /*
 put it in sketch
*/
    display(){

      textSize(15); // 8 lines added
      if(this.lastFed>=12){
          text("Last Feed : "+ this.lastFed%12 + " PM", 50,30);
      }else if(this.lastFed==0){
          text("Last Feed : 12 AM",50,30);
      }else{
          text("Last Feed : "+ this.lastFed + " AM", 50,30);
      }

      var x=50;
      var y=50;
      imageMode(CENTER);
      if(this.foodStock!==0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10===0){
            x=50;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
       
  }
    
    

      bedroom(){
        background(bedroomimg,550,500);
      }

      washroom(){
        background(washroomimg,550,500);
      }

      garden(){
        background(gardenimg,550,500);
      }

   
    
    }
