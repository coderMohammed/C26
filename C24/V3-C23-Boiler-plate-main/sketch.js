const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var tower,ground,canon,cannonball;
var bgImg,boat;
var balls = [];
var boats = [];

function preload(){
    bgImg = loadImage("assets/background.gif")
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    var angle = -PI/4

    tower = new Tower(150,350,160,310);
    ground = new Ground(width,height-10,1500,20)  
    canon = new Canon(180,110,100,50,angle)  
    
}

function draw(){
    background(220);

    image(bgImg,0,0,1200,600)

    Engine.update(engine);

    tower.display();
    canon.display();
   

    for(var i=0; i< balls.length ; i++){
        showCannonBall(balls[i],i)
        for(var j=0; j<boats.length;j++){
            if(balls[i]!== undefined && boats[j]!==undefined ){
                    
                var collision = Matter.SAT.collides(balls[i].body,boats[j].body); 
                
                if(collision.collided){
                    boats[j].remove(j);
                    Matter.World.remove(world,balls[i].body);
                    balls.splice(i,1);
                    i--;
                }
            }
        }
    }

    showBoats();
}

function keyReleased(){
    if(keyCode===DOWN_ARROW){
        balls[balls.length-1].shoot();
    }
}

function keyPressed(){
     if(keyCode===DOWN_ARROW)
      {
        cannonball = new CannonBall(canon.x,canon.y);
        balls.push(cannonball)
      }  
}

function showCannonBall(ball,index){
    ball.display();
    if(ball.body.position.x >= width && ball.body.position.y >=height -100){
        World.remove(world,ball.body);
        balls.splice(index,1);
    }
}

function showBoats(){
    
    if(boats.length>0){
        
        if(boats.length<4 && boats[boats.length-1].body.position.x < width-300){  
            var positions = [-100,-70,-60,-50];
            var pos = random(positions);
            var boat = new Boat(width,height-100,200,200,pos);
            boats.push(boat);
        }

        for(var i = 0; i < boats.length; i++){
            boats[i].display();
            Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        }
    }
    else{
        var boat = new Boat(width,height-100,200,200,-10);
        boats.push(boat);
    }
}