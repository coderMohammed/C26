class CannonBall {
    constructor(x, y) {
        var options = {
            restitution: 0.5,
            friction: 1.0,
            density: 1.0,
            isStatic: true,
        }
        this.r = 40;
        this.body = Bodies.circle(x, y, this.r, options);
        World.add(world, this.body);
        this.trajectory = [];
        this.image = loadImage("assets/cannonball.png");
        
    }
    display() {
        var angle = this.body.angle
        var pos = this.body.position
        push();
        translate(pos.x, pos.y);
        rotate(angle)
        imageMode(CENTER)
        image(this.image, 0, 0, this.r, this.r)
        pop();
        if(this.body.velocity.x > 0 && this.body.position.x >= 300){
            var position = [pos.x,pos.y];
            this.trajectory.push(position);
        }
        for(var i = 0;i<=this.trajectory.length-1;i++){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5);
        }
    }

    shoot() {
        var velocity = p5.Vector.fromAngle(canon.angle);
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });

    }
}