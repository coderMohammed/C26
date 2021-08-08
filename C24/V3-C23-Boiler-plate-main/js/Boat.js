class Boat{
    constructor(x,y,w,h,boatPos){
        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.body);

        this.width = w;
        this.height = h;
        this.image = loadImage("assets/boat.png");
        this.boatPos = boatPos;
    }

   display(){
       var pos = this.body.position;
       var angle = this.body.angle
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.boatPos,this.width,this.height);
        pop();       
    }

    remove(index){
        World.remove(world,boats[index].body);
        boats.splice(index,1);
    }
}


